import { KonciaceSkoleniaRow, SkoleniaZamestnanca } from "./types";

export const DUMMY_SKOLENIA: SkoleniaZamestnanca[] = [
  {
    meno: "Adam",
    priezvisko: "Maly",
    osobneCislo: 12,
    skolenie1: {
      datum: new Date(321),
      nazov: 'skolenie1',
      kod: "sk1",
      dlzka_platnosti: 12,
      oblast: "vyroba",
      popis: "kratky popis"
    },
  }
]


export const expCourses: KonciaceSkoleniaRow[] = [
  {
    datum: new Date(),
    pocetDniPlatnosti: 9,
    skolenie: 'xx',
    osobne_cislo: 12,
    priezvisko: "Ferko",
    meno: "Jan",
    nadriadeny: "Maly",
  },
  {
    datum: new Date(),
    pocetDniPlatnosti: 9,
    skolenie: 'xx',
    osobne_cislo: 12,
    priezvisko: "Ferko",
    meno: "Jan",
    nadriadeny: "Maly",
  },
  {
    datum: new Date(),
    pocetDniPlatnosti: 0,
    skolenie: 'xx',
    osobne_cislo: 13,
    priezvisko: "Silny",
    meno: "Filip",
    nadriadeny: "Maly",
  },
  {
    datum: new Date(),
    pocetDniPlatnosti: 14,
    skolenie: 'xx',
    osobne_cislo: 14,
    priezvisko: "Janko",
    meno: "Jan",
    nadriadeny: "Maly",
  },

]
