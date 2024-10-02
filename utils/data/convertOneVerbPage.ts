import { load } from "cheerio";

import type { Model, Verbs } from "../../types/verb";

import { capitalizeFirstLetter } from "../helpers";
import {
  writeDataToJSON,
  extractFileDataFromHtmlFile,
  getPath,
} from "./helpers";

/**
 * Turn the HTML of one verb page collected
 * and extract the data from it using cheerio.
 */
export const scrapeVerbHTML = async (html: string) => {
  // const verb = "%C3%AAtre"; // être

  try {
    // Read the HTML with cheerio
    const $ = load(html);

    const name = $("#ch_lblModel").text();
    const definition = $("#list-translations p").text();
    const model = $("#ch_lblModel").text() as Model;
    const auxiliary = $("#ch_lblAuxiliary").text() as Model;
    const otherForms = $("#ch_lblAutreForm").text();

    // console.log("Data read from file", name);

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
        const text = $(item).text().replaceAll("\n", "").trim();
        let split = [];
        if (text.includes("j'")) {
          split = text.split("j'");
          // add j' to beginning of array
          split[0] = "j'";
        } else {
          split = text.split(" ");
        }
        const [first, ...rest] = split;
        texts[first] = rest;
      });
      // console.log({ texts });
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
    return result;
  } catch (error) {
    console.log("An error has occurred ", error);
  }
};

export const convertOneVerbPageHTMLToGetTheData = async (
  verb = "%C3%AAtre"
) => {
  const html = await extractFileDataFromHtmlFile(verb);
  const formattedData = await scrapeVerbHTML(html);
  await writeDataToJSON(getPath(verb, "index.json"), formattedData);

  return formattedData;
};
