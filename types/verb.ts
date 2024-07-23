interface Verb {
  je: string;
  tu: string;
  il: string; // elle/il/on
  nous: string;
  vous: string;
  ils: string; // ils/elles
}

type Model = "être" | "avoir";

interface Verbs {
  definition: string; // What the verb means

  model: Model;
  auxillary: Model;
  otherForms: string;

  // Indicative
  indicative: {
    present: Verb;
    imparfait: Verb;
    futur: Verb;
    "passé simple": Verb;
    "passé composé": Verb;
    "plus-que-parfait": Verb;
    "Passé antérieur": Verb;
    "futur antérieur": Verb;
  };

  // Subjonctif
  subjonctif: {
    présent: Verb;
    imparfait: Verb;
    "plus-que-parfait": Verb;
    passé: Verb;
  };

  // Conditionnel
  conditionnel: {
    présent: Verb;
    "passé première forme": Verb;
    "passé deuxième forme": Verb;
  };

  // PARTICIPE
  participe: {
    présent: string;
    "passé composé": string;
    passé: {
      "masc.sg": string;
      "masc.pl": string;
      "fém.sg": string;
      "fém.pl": string;
    };
  };

  // Impératif
  impératif: {
    présent: FixedSizeArray<3, string>; // are there always 3 of these?
    passé: FixedSizeArray<3, string>; // are there always 3 of these?
  };

  // infinitive
  infinitive: {
    présent: string;
    passé: string;
  };
}

type TupleString = readonly [string, string, string];

// https://mstn.github.io/2018/06/08/fixed-size-arrays-in-typescript/
type FixedSizeArray<N extends number, T> = N extends 0
  ? never[]
  : {
      0: T;
      length: N;
    } & ReadonlyArray<T>;
