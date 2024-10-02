import { test, expect } from "vitest";
import { convertOneVerbPageHTMLToGetTheData } from "./convertOneVerbPage";

test("convertOneVerbPageHTMLToGetTheData", async () => {
  const data = await convertOneVerbPageHTMLToGetTheData();

  // This is when you want to check for the presence of key: value pair in object but not check the whole object.
  //   expect(data).toEqual(
  //     expect.objectContaining({
  //       name: "être",
  //     })
  //   );

  // This is when you want to check every part of the object. Fails if any differences.
  expect(data).toEqual({
    name: "être",
    auxiliary: "avoir",
    definition: "be; have; get; ...",
    model: "être",
    otherForms: "ne pas être",
    indicatif: {
      présent: {
        je: ["suis"],
        tu: ["es"],
        "il/elle": ["est"],
        nous: ["sommes"],
        vous: ["êtes"],
        "ils/elles": ["sont"],
      },
      imparfait: {
        "j'": ["étais"],
        tu: ["étais"],
        "il/elle": ["était"],
        nous: ["étions"],
        vous: ["étiez"],
        "ils/elles": ["étaient"],
      },
      futur: {
        je: ["serai"],
        tu: ["seras"],
        "il/elle": ["sera"],
        nous: ["serons"],
        vous: ["serez"],
        "ils/elles": ["seront"],
      },
      "passé simple": {
        je: ["fus"],
        tu: ["fus"],
        "il/elle": ["fut"],
        nous: ["fûmes"],
        vous: ["fûtes"],
        "ils/elles": ["furent"],
      },
      "passé composé": {
        "j'": ["ai été"],
        tu: ["as été"],
        "il/elle": ["a été"],
        nous: ["avons été"],
        vous: ["avez été"],
        "ils/elles": ["ont été"],
      },
      "plus-que-parfait": {
        "j'": ["avais été"],
        tu: ["avais été"],
        "il/elle": ["avait été"],
        nous: ["avions été"],
        vous: ["aviez été"],
        "ils/elles": ["avaient été"],
      },
      "passé antérieur": {
        "j'": ["eus été"],
        tu: ["eus été"],
        "il/elle": ["eut été"],
        nous: ["eûmes été"],
        vous: ["eûtes été"],
        "ils/elles": ["eurent été"],
      },
      "futur antérieur": {
        "j'": ["aurai été"],
        tu: ["auras été"],
        "il/elle": ["aura été"],
        nous: ["aurons été"],
        vous: ["aurez été"],
        "ils/elles": ["auront été"],
      },
    },
  });
});
