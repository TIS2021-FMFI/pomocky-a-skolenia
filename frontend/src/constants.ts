import { Column, COLUMN_NAME, EmployeeData, Fa, Kava } from "./types";

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
  meno: "",
  priezvisko: "",
  // pravomoc: Pravomoc.PRACOVNIK,
  // oblasti: [],
  VZV: "",
  datum_vydania: null,
  pozicia: "",
  fa: Fa.GEFCO,
  oblast: "",
  osobne_cislo: undefined,
  karticka: undefined,
  kava: Kava.NIE,
  bufetka: undefined,
  zfsatna: undefined,
  zfskrinka: undefined,
  winnex: undefined,
};
