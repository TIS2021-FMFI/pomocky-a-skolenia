export type EmployeeData = {
  id: number | null;
  meno: string;
  priezvisko: string;
  VZV: string | null;
  datum_vydania: Date | null;
  pozicia: string;
  fa: Fa;
  oblast: string;
  osobne_cislo: number | null;
  karticka: number | null;
  kava: Kava;
  bufetka: number | null;
  zfsatna: number | null;
  zfskrinka: number | null;
  winnex: number | null;
};

export enum Fa {
  GEFCO = "GEFCO",
  LEASING = "leasing",
  AGENTURA = "Agentura",
}

export enum Pravomoc {
  PRACOVNIK = "Pracovnik",
  NADRIADENY = "Nadriadeny",
}

export enum Kava {
  ANO = "true",
  NIE = "false",
}

export enum COLUMN_NAME {
  datum = "datum",
  pocetDniPlatnosti = "pocetDniPlatnosti",
  skolenie = "skolenie",
  osobne_cislo = "osobne_cislo",
  priezvisko = "priezvisko",
  meno = "meno",
  nadriadeny = "nadriadeny",
}

export type Column = {
  id: COLUMN_NAME;
  label: string;
  minWidth: number;
};

export type KonciaceSkoleniaRow = {
  datum: Date;
  pocetDniPlatnosti?: number;
  skolenie: string;
  osobne_cislo: number;
  priezvisko: string;
  meno: string;
  nadriadeny: string;
};

export type SkoleniaRow = {
  osobne_cislo: number;
  priezvisko: string;
  meno: string;
  [key: string]: any;
};

export type Oblast = {
  id: number;
  oblast: string;
};

type baseType = {
  meno: string;
  priezvisko: string;
  osobneCislo: number;
};
type restType = { [key: string]: SkolenieZamestnanca | string | number };
export type SkoleniaZamestnanca = Omit<restType, keyof baseType> & baseType;

export type SkolenieZamestnanca = {
  datum: Date;
  nazov: string;
  kod: string;
  oblast: string;
  dlzka_platnosti: number;
  popis: string;
};

export type Skolenie = {
  id: number | null;
  nazov: string;
  kod_skolenia: string;
  dlzka_platnosti: number | null;
  oblast: string;
  popis: string;
};
