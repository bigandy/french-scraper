import playwright from "playwright";
import fs from "fs-extra";

import { browserType, launchOptions } from "./config";

import { scrapePageForHTMLContent } from "./scrapeOneVerbPage";

import pLimit from "p-limit";

export const scrapeAllVerbPages = async () => {
  console.log("Running scrapeAllVerbPages script");

  try {
    const fileDataBuffer = await fs.readFileSync(
      "./data/urls/all-verb-urls.json"
    );

    // convert the Buffer to HTML
    const { allVerbUrls } = JSON.parse(Buffer.from(fileDataBuffer).toString());

    // TODO
    // 1. [x] Read a json file that contains an array of index page urls
    // 2. [x] For each of this list visit each of the pages with playwright
    // 3. [x] save the HTML file
    // 4. [ ] Have a queue
    // 4. [ ] record if successful
    // 5. [ ] record if unsuccessful

    await scrapeVerbUrls(allVerbUrls);
  } catch (error) {
    console.log("An error has occurred ", error);
  }
};

async function scrapeVerbUrls(urls: string[]) {
  const limit = pLimit(1);

  const browser = await playwright[browserType].launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();

  const input = urls.map((url) =>
    limit(() => scrapePageForHTMLContent(url, page))
  );

  // NEEDS a Queue system so not ramming the website!
  //   for (const url of urls) {
  //     await queue.add(() => scrapePageForHTMLContent(url, page));
  //   }

  await Promise.all(input);
  await browser.close();
}
