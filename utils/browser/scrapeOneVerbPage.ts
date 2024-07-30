import { setTimeout } from "node:timers/promises";
import fs from "fs-extra";
import { Page } from "playwright";

import playwright from "playwright";

import { browserType, launchOptions } from "./config";

const getVerbNamefromUrl = (url: string) =>
  url.split("-").at(-1)?.replace(".html", "");

const getPageContent = async (url: string, page: Page) => {
  await page.goto(url);

  if (launchOptions.headless === false) {
    await page.waitForSelector("#didomi-popup");
    await page.click("#didomi-notice-agree-button");
  }

  const content = await page.innerHTML(".content-conj");

  return content;
};

const writeHTMLToFile = async (path: string, content: string) => {
  try {
    await fs.outputFile(path, content, {
      encoding: "utf-8",
      flag: "w",
    });
    console.log("Data successfully saved to disk: " + path);
  } catch (error) {
    console.log("An error has occurred ", error);
  }
};

/**
 * Get the HTML content from one verb page url.
 */
export const scrapePageForHTMLContent = async (url: string, page: Page) => {
  const verb = getVerbNamefromUrl(url);
  console.log("Running scrapeOneVerbPage script with verb " + verb);

  const content = await getPageContent(url, page);

  const path = `./data/verbs/${verb}/index.html`;

  await writeHTMLToFile(path, content);

  // TODO:
  // For each index page, scrape that page for the verb links on the page using this ".index-content li > a" selector.
  // - Do this is a serial manner so that one page at a time so as to not strain the source website too much.
};

export const scrapeOneVerbPage = async () => {
  const verbPageUrl = `https://conjugator.reverso.net/conjugation-french-verb-%C3%AAtre.html`;

  const browser = await playwright[browserType].launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();

  // First scrape
  await scrapePageForHTMLContent(verbPageUrl, page);

  console.time("waiting");

  // 2s wait
  await setTimeout(2000);

  console.timeEnd("waiting");

  // 2nd scrape
  await scrapePageForHTMLContent(
    "https://conjugator.reverso.net/conjugation-french-verb-faire.html",
    page
  );

  // "https://conjugator.reverso.net/conjugation-french-verb-%C3%AAtre.html",
  //   "https://conjugator.reverso.net/conjugation-french-verb-faire.html",

  await browser.close();
};
