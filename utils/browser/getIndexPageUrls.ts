import playwright from "playwright";
import { promises as fs } from "fs";

import { browserType, launchOptions } from "./config";

export const getIndexPageUrls = async () => {
  console.log("Running getIndexPageUrls script");

  const indexPage = "https://conjugator.reverso.net/index-french-1-250.html";
  const browser = await playwright[browserType].launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(indexPage);

  if (launchOptions.headless === false) {
    await page.waitForSelector("#didomi-popup");
    await page.click("#didomi-notice-agree-button");
  }

  const indexLinks = await page
    .locator(".index-title > a")
    .evaluateAll((els: HTMLAnchorElement[]) => els.map((el) => el.href));

  // TODO:
  // For each index page, scrape that page for the verb links on the page using this ".index-content li > a" selector.
  // - Do this is a serial manner so that one page at a time so as to not strain the source website too much.

  const path = "./data/urls/index-urls.json";

  try {
    fs.writeFile(path, JSON.stringify({ indexLinks }), {
      encoding: "utf-8",
      flag: "w",
    }).catch((error: Error) => {
      console.error("Error writing the JSON file:", error);
    });
    console.log("Data successfully saved to disk");
  } catch (error) {
    console.log("An error has occurred ", error);
  }

  await browser.close();

  return indexLinks;
};
