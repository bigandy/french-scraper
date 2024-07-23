import fs from "fs-extra";
import cheerio from "cheerio";

import type { Verbs } from "../types/verb";

export const convertOneVerbPage = async () => {
  console.log("Running scrapeOneVerbPage script");

  const verb = "%C3%AAtre"; // être

  const getPath = (filename: "index.html" | "index.json") => {
    const path = `./data/verbs/${verb}/${filename}`;
    return path;
  };

  // TODO:
  // 1. Load the HTML of the verb
  // 2. read the content of the HTML and extract the information in a form that can be
  //    used in a later stage
  // 3. the structure of the data is already defined in /types/verb.ts
  // 4. save the data as a .json file in the same folder

  try {
    const fileDataBuffer = await fs.readFileSync(getPath("index.html"));

    // convert the Buffer to HTML
    const fileData = Buffer.from(fileDataBuffer).toString();
    const $ = cheerio.load(fileData);
    const name = $("#ch_lblModel").text(); // Read the HTML with cheerio
    const definition = $("#list-translations p").text();
    console.log("Data read from file", name);

    const result: Verbs = {
      name,
      definition,
    };

    try {
      fs.outputFile(getPath("index.json"), JSON.stringify(result), {
        encoding: "utf-8",
        flag: "w",
      });
      // .catch((error: Error) => {
      //   console.error("Error writing the JSON file:", error);
      // });
      console.log("Data successfully saved to disk");
    } catch (error) {
      console.log("An error has occurred ", error);
    }
  } catch (error) {
    console.log("An error has occurred ", error);
  }
};
