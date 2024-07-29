// source of all other indexes in .index-title > a
import { scrapeAllVerbPages } from "./utils/browser/scrapeAllVerbPages";
// import { getAllVerbUrlsFromIndexUrls } from "./utils/browser/getAllVerbUrlsFromIndexUrls";

const run = async () => {
  // const urls = await getIndexPageUrls();

  // console.log({ urls });

  // await scrapeOneVerbPage();
  // await convertOneVerbPage();

  await scrapeAllVerbPages();
};

run();
