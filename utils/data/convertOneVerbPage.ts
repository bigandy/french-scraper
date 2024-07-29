import fs from "fs-extra";
import cheerio from "cheerio";

import type { Verbs, Verb, Model } from "../types/verb";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Turn the HTML of one verb page collected
 * and extract the data from it using cheerio.
 */
export const convertOneVerbPageHTMLToGetTheData = async () => {
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
    const model = $("#ch_lblModel").text() as Model;
    const auxiliary = $("#ch_lblAuxiliary").text() as Model;
    const otherForms = $("#ch_lblAutreForm").text();

    console.log("Data read from file", name);

    // TODO: type Indicative
    const indicatif: any = {};
    const indicativeChildren = [
      "présent",
      "imparfait",
      "futur",
      "passé simple",
      "passé composé",
      "plus-que-parfait",
      "passé antérieur",
      "futur antérieur",
    ];

    indicativeChildren.forEach((selector) => {
      const combinedSelector = `[mobile-title="Indicatif ${capitalizeFirstLetter(
        selector
      )}"] ul`;

      const items = $(combinedSelector).find("li");

      const texts: any = {};
      items.each((_, item) => {
        const split = $(item).text().trim().split(" ");
        texts[split[0]] = split[1];
      });
      indicatif[selector] = texts;
    });

    // console.log({ Indicatif });

    // const subjonctif: any = {};
    // const subjonctifChildren = [
    //   "présent",
    //   "imparfait",
    //   "plus-que-parfait",
    //   "passé",
    // ];

    // subjonctifChildren.forEach((selector) => {
    //   const combinedSelector = `[mobile-title="Subjonctif ${capitalizeFirstLetter(
    //     selector
    //   )}"] ul`;

    //   const items = $(combinedSelector).find("li");

    //   const texts: any = {};
    //   items.each((_, item) => {
    //     const split = $(item).text().trim().split(" ");
    //     texts[split[0]] = split[1];
    //   });
    //   subjonctif[selector] = texts;
    // });

    // for each verb sub-component grouping we have a [mobile-title="Parent Child"]  > ul
    // Listing which will contain all the information
    // an example is [mobile=title="Indicatif Présent"] > ul

    const result: Verbs = {
      name,
      definition,
      model,
      auxiliary,
      otherForms,

      indicatif,
      //   subjonctif,
    };

    // WRITE TO JSON
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
