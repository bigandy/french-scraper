import { test, expect, describe, it } from "vitest";
import { convertOneVerbPageHTMLToGetTheData } from "./convertOneVerbPage";

const testData = {
  name: "être",
  auxiliary: "avoir",
  definition: "be; have; get; ...",
  model: "être",
  otherForms: "ne pas être",
  indicatif: {
    présent: {
      je: "suis",
      tu: "es",
      "il/elle": "est",
      nous: "sommes",
      vous: "êtes",
      "ils/elles": "sont",
    },
    imparfait: {
      "j'": "étais",
      tu: "étais",
      "il/elle": "était",
      nous: "étions",
      vous: "étiez",
      "ils/elles": "étaient",
    },
    futur: {
      je: "serai",
      tu: "seras",
      "il/elle": "sera",
      nous: "serons",
      vous: "serez",
      "ils/elles": "seront",
    },
    "passé simple": {
      je: "fus",
      tu: "fus",
      "il/elle": "fut",
      nous: "fûmes",
      vous: "fûtes",
      "ils/elles": "furent",
    },
    "passé composé": {
      "j'": "ai été",
      tu: "as été",
      "il/elle": "a été",
      nous: "avons été",
      vous: "avez été",
      "ils/elles": "ont été",
    },
    "plus-que-parfait": {
      "j'": "avais été",
      tu: "avais été",
      "il/elle": "avait été",
      nous: "avions été",
      vous: "aviez été",
      "ils/elles": "avaient été",
    },
    "passé antérieur": {
      "j'": "eus été",
      tu: "eus été",
      "il/elle": "eut été",
      nous: "eûmes été",
      vous: "eûtes été",
      "ils/elles": "eurent été",
    },
    "futur antérieur": {
      "j'": "aurai été",
      tu: "auras été",
      "il/elle": "aura été",
      nous: "aurons été",
      vous: "aurez été",
      "ils/elles": "auront été",
    },
  },
  subjonctif: {
    présent: {
      que: "vous soyez",
      "qu'il/elle": "soit",
      "qu'ils/elles": "soient",
    },
    imparfait: {
      que: "vous fussiez",
      "qu'il/elle": "fût",
      "qu'ils/elles": "fussent",
    },
    "plus-que-parfait": {
      "j'": "eusse été",
      que: "vous eussiez été",
      "qu'il/elle": "eût été",
      "qu'ils/elles": "eussent été",
    },
    passé: {
      "j'": "aie été",
      que: "vous ayez été",
      "qu'il/elle": "ait été",
      "qu'ils/elles": "aient été",
    },
  },
  conditionnel: {
    présent: {
      je: "serais",
      tu: "serais",
      "il/elle": "serait",
      nous: "serions",
      vous: "seriez",
      "ils/elles": "seraient",
    },
    "passé première forme": {
      "j'": "aurais été",
      tu: "aurais été",
      "il/elle": "aurait été",
      nous: "aurions été",
      vous: "auriez été",
      "ils/elles": "auraient été",
    },
    "passé deuxième forme": {
      "j'": "eusse été",
      tu: "eusses été",
      "il/elle": "eût été",
      nous: "eussions été",
      vous: "eussiez été",
      "ils/elles": "eussent été",
    },
  },
  participe: {
    présent: { étant: "" },
    "passé composé": { ayant: "été" },
    passé: {
      "masc.sg.:": "été",
      "masc.pl.:": "été",
      "fém.sg.:": "été",
      "fém.pl.:": "été",
    },
  },
  imperatif: {
    présent: { sois: "", soyons: "", soyez: "" },
    passé: { aie: "été", ayons: "été", ayez: "été" },
  },
  infinitif: { présent: { être: "" }, passé: { avoir: "été" } },
};

describe("convertOneVerbPageHTMLToGetTheData", async () => {
  // beforeAll(async () => {
  const data = await convertOneVerbPageHTMLToGetTheData();
  // });

  test.each(Object.keys(testData))(`%s is correct`, (name) => {
    // @ts-expect-error
    expect(data?.[name]).toEqual(testData?.[name]);
  });

  // This is when you want to check for the presence of key: value pair in object but not check the whole object.
  // AHTODO: Need to figure this out still!
  //   expect(data).toEqual(expect.objectContaining(test));
  //   expect(data).toEqual(
  //     expect.objectContaining({
  //       indicatif: expect.any(Object),
  //     })
  //   );

  it("the returned object should match the test data object", () => {
    // This is when you want to check every part of the object. Fails if any differences.
    expect(data).toEqual(testData);
  });
});
