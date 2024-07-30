import { setTimeout } from "node:timers/promises";
import playwright from "playwright";
import fs from "fs-extra";

import { browserType, launchOptions } from "./config";

import { scrapePageForHTMLContent } from "./scrapeOneVerbPage";

// import pLimit from "p-limit";
import PQueue from "p-queue";
const queue = new PQueue({ concurrency: 1, interval: 10000, intervalCap: 2 });

// const limit = pLimit(1);

export const scrapeAllVerbPages = async () => {
  console.log("Running scrapeAllVerbPages script");

  try {
    const fileDataBuffer = await fs.readFileSync(
      "./data/urls/all-verb-urls.json"
    );

    // convert the Buffer to HTML
    const { allVerbUrls } = JSON.parse(Buffer.from(fileDataBuffer).toString());

    const allUrls = allVerbUrls;

    // console.log({ allUrls, len: allUrls.length });

    // TODO
    // 1. [x] Read a json file that contains an array of index page urls
    // 2. [x] For each of this list visit each of the pages with playwright
    // 3. [x] save the HTML file
    // 4. [ ] Have a queue
    // 4. [ ] record if successful
    // 5. [ ] record if unsuccessful

    await scrapeVerbUrls(allUrls);
  } catch (error) {
    console.log("An error has occurred in scrapeAllVerbPages", error);
  }
};

async function scrapeVerbUrls(urls: string[]) {
  console.time("queue");
  const browser = await playwright[browserType].launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();

  // NEEDS a Queue system so not ramming the website!
  // STILL NEEDS A QUEUE system.

  // console.log(map);
  // await queue.add(() => scrapePageForHTMLContent(urls[0], page));
  // await queue.add(async () => await scrapePageForHTMLContent(urls[0], page));
  // console.time("waiting");
  // await queue.add(async () => await setTimeout(2000));
  // console.timeEnd("waiting");
  // await queue.add(async () => await scrapePageForHTMLContent(urls[1], page));
  // await queue.add(async () => await scrapePageForHTMLContent(urls[2], page));

  const allUrls = urls.map(async (url: string) => {
    // const timer = await setTimeout(2000);
    // await queue.add(timer);
    await queue.add(async () => await scrapePageForHTMLContent(url, page));
    return;
  });

  await Promise.all([...allUrls]);

  // Only one promise is run at once
  // const result = await Promise.all(input);
  await browser.close();
  console.timeEnd("queue");
}
