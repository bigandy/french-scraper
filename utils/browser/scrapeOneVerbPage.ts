import playwright, { Page } from "playwright";
import fs from "fs-extra";

import { browserType, launchOptions } from "./config";

/**
 * Get the HTML content from one verb page url.
 */
export const scrapePageForHTMLContent = async (url: string, page: Page) => {
  const verb = url.split("-").at(-1)?.replace(".html", "");

  console.log("Running scrapeOneVerbPage script with verb " + verb);

  await page.goto(url);

  if (launchOptions.headless === false) {
    await page.waitForSelector("#didomi-popup");
    await page.click("#didomi-notice-agree-button");
  }

  const contentConj = await page.innerHTML(".content-conj");

  // TODO:
  // For each index page, scrape that page for the verb links on the page using this ".index-content li > a" selector.
  // - Do this is a serial manner so that one page at a time so as to not strain the source website too much.

  const path = `./data/verbs/${verb}/index.html`;

  try {
    fs.outputFile(path, contentConj, {
      encoding: "utf-8",
      flag: "w",
    });
    // .catch((error: Error) => {
    //   console.error("Error writing the JSON file:", error);
    // });
    console.log("Data successfully saved to disk: " + verb);
  } catch (error) {
    console.log("An error has occurred ", error);
  }
  return;
};

// const scrapeOneVerbPage = async () => {
//   const verbPageUrl = `https://conjugator.reverso.net/conjugation-french-verb-%C3%AAtre.html`;

//   const browser = await playwright[browserType].launch(launchOptions);
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await scrapePageForHTMLContent(verbPageUrl, page);

//   await browser.close();
// };
