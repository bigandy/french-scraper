// source of all other indexes in .index-title > a
// import { scrapeAllVerbPages } from "./utils/browser/scrapeAllVerbPages";
// import { getAllVerbUrlsFromIndexUrls } from "./utils/browser/getAllVerbUrlsFromIndexUrls";

// import { scrapeOneVerbPage } from "./utils/browser/scrapeOneVerbPage";
import { convertOneVerbPageHTMLToGetTheData, writeVerbDataToJSON } from "./utils/data/convertOneVerbPage";

const run = async () => {
  // const urls = await getIndexPageUrls();

  // console.log({ urls });

  // await scrapeOneVerbPage();
  // await convertOneVerbPage();

  // await scrapeOneVerbPage();
  // await scrapeAllVerbPages();

  const data = await convertOneVerbPageHTMLToGetTheData();
  if (data) {
    await writeVerbDataToJSON(data, "%C3%AAtre");
  }
};

run();
