import playwright from "playwright";
import fs from "fs-extra";

import { browserType, launchOptions } from "./config";

export const scrapeOneVerbPage = async () => {
  console.log("Running scrapeOneVerbPage script");

  const verb = "%C3%AAtre"; // être
  const verbPageUrl = `https://conjugator.reverso.net/conjugation-french-verb-${verb}.html`;

  const browser = await playwright[browserType].launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(verbPageUrl);

  if (launchOptions.headless === false) {
    await page.waitForSelector("#didomi-popup");
    await page.click("#didomi-notice-agree-button");
  }

  const contentConj = await page.innerHTML(".content-conj");

  // TODO:
  // For each index page, scrape that page for the verb links on the page using this ".index-content li > a" selector.
  // - Do this is a serial manner so that one page at a time so as to not strain the source website too much.

  const path = `./data/verbs/${verb}/index.html`;

  console.log({ contentConj });

  try {
    fs.outputFile(path, contentConj, {
      encoding: "utf-8",
      flag: "w",
    });
    // .catch((error: Error) => {
    //   console.error("Error writing the JSON file:", error);
    // });
    console.log("Data successfully saved to disk");
  } catch (error) {
    console.log("An error has occurred ", error);
  }

  await browser.close();
};
