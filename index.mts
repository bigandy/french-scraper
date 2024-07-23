// source of all other indexes in .index-title > a

import { getIndexPageUrls } from "./utils/getIndexPageUrls";
import { scrapeOneVerbPage } from "./utils/scrapeOneVerbPage";
import { convertOneVerbPage } from "./utils/convertOneVerbPage";

const run = async () => {
  // const urls = await getIndexPageUrls();

  // console.log({ urls });

  // await scrapeOneVerbPage();
  await convertOneVerbPage();
};

run();
