import { Column, COLUMN_NAME, Fa, Kava, Pravomoc } from "./types";

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
    id: COLUMN_NAME.osobneCislo,
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

export const initialEmployee = {
  meno: "",
  priezvisko: "",
  pravomoc: Pravomoc.PRACOVNIK,
  oblasti: [],
  pozicia: "",
  fa: Fa.GEFCO,
  oblast: "",
  osobneCislo: undefined,
  karticka: undefined,
  kava: Kava.NIE,
  bufetka: undefined,
  zfSatna: undefined,
  zfSkrinka: undefined,
  winnex: undefined,
};
