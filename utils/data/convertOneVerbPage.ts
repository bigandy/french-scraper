import { load, CheerioAPI } from "cheerio";

import type { Model, Verbs, Verb } from "../../types/verb";

import { capitalizeFirstLetter } from "../helpers";
import {
  writeDataToJSON,
  extractFileDataFromHtmlFile,
  getPath,
} from "./helpers";

const getIndicative = ($: CheerioAPI) => {
  const indicativeChildren = [
    "présent",
    "imparfait",
    "futur",
    "passé simple",
    "passé composé",
    "plus-que-parfait",
    "passé antérieur",
    "futur antérieur",
  ] as const;

  type IndicativeChildren = (typeof indicativeChildren)[number];

  const indicatif: {
    [key in IndicativeChildren]?: Verb;
  } = {};

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
      texts[first] = rest.join(" ");
    });
    indicatif[selector] = texts;
  });

  return indicatif;
};

const getSubjonctive = ($: CheerioAPI) => {
  const subjonctif: any = {};
  const subjonctifChildren = [
    "présent",
    "imparfait",
    "plus-que-parfait",
    "passé",
  ];

  subjonctifChildren.forEach((selector) => {
    const combinedSelector = `[mobile-title="Subjonctif ${capitalizeFirstLetter(
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
      texts[first] = rest.join(" ");
    });
    subjonctif[selector] = texts;
  });

  return subjonctif;
};

const getConditionnel = ($: CheerioAPI) => {
  const conditionnel: any = {};
  const conditionnelChildren = [
    "présent",
    "passé première forme",
    "passé deuxième forme",
  ];

  conditionnelChildren.forEach((selector) => {
    const combinedSelector = `[mobile-title="Conditionnel ${capitalizeFirstLetter(
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
      texts[first] = rest.join(" ");
    });
    conditionnel[selector] = texts;
  });

  return conditionnel;
};

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

    const indicatif = getIndicative($);
    const subjonctif = getSubjonctive($);
    const conditionnel = getConditionnel($);

    const result: Verbs = {
      name,
      definition,
      model,
      auxiliary,
      otherForms,

      // @ts-expect-error
      indicatif,
      subjonctif,
      conditionnel,
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
