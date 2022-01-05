import { Column, COLUMN_NAME, EmployeeData, Fa, Kava, Skolenie } from "./types";

export const CoursesBeforeExpireColumns: Column[] = [
  {
    id: COLUMN_NAME.datum,
    label: "Datum",
    minWidth: 120,
  },
  {
    id: COLUMN_NAME.pocetDniPlatnosti,
    label: "Pocet dni platnosti",
    minWidth: 120,
  },
  {
    id: COLUMN_NAME.skolenie,
    label: "Skolenie",
    minWidth: 120,
  },
  {
    id: COLUMN_NAME.osobne_cislo,
    label: "Osobne cislo",
    minWidth: 120,
  },
  {
    id: COLUMN_NAME.priezvisko,
    label: "Priezvisko",
    minWidth: 120,
  },
  {
    id: COLUMN_NAME.meno,
    label: "Meno",
    minWidth: 120,
  },
  {
    id: COLUMN_NAME.nadriadeny,
    label: "Nadriadeny",
    minWidth: 120,
  },
];

export const initialEmployee: EmployeeData = {
  id: null,
  meno: "",
  priezvisko: "",
  VZV: null,
  datum_vydania: null,
  pozicia: "",
  fa: Fa.GEFCO,
  oblast: "",
  osobne_cislo: null,
  karticka: null,
  kava: Kava.NIE,
  bufetka: null,
  zfsatna: null,
  zfskrinka: null,
  winnex: null,
};

export const initialSkolenie: Skolenie = {
  id: null,
  nazov: "",
  kod_skolenia: "",
  dlzka_platnosti: null,
  oblast: "",
  popis: "",
};
