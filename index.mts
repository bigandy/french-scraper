// source of all other indexes in .index-title > a

import { getIndexPageUrls } from "./utils/getIndexPageUrls";
import { scrapeOneVerbPage } from "./utils/scrapeOneVerbPage";

const run = async () => {
  // const urls = await getIndexPageUrls();

  // console.log({ urls });

  await scrapeOneVerbPage();
};

run();
