import playwright from "playwright";
import fs from "fs/promises";

const browserType = "chromium";

const headless = true;

const launchOptions = {
  headless,
};

// source of all other indexes in .index-title > a
const indexPage = "https://conjugator.reverso.net/index-french-1-250.html";

const run = async () => {
  console.log("Running Scraper");
  const browser = await playwright[browserType].launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(indexPage);

  if (headless === false) {
    await page.waitForSelector("#didomi-popup");
    await page.click("#didomi-notice-agree-button");
  }

  const indexLinks = await page
    .locator(".index-title > a")
    .evaluateAll((els) => els.map((el) => el.href));

  // TODO:
  // For each index page, scrape that page for the verb links on the page using this ".index-content li > a" selector.
  // - Do this is a serial manner so that one page at a time so as to not strain the source website too much.

  const path = "./data/urls/index-urls.json";

  try {
    fs.writeFile(path, JSON.stringify({ indexLinks }), {
      encoding: "utf-8",
      flag: "w",
    }).catch((error) => {
      console.error("Error writing the JSON file:", error);
    });
    console.log("Data successfully saved to disk");
  } catch (error) {
    console.log("An error has occurred ", error);
  }

  await browser.close();
};

run();
