export type EmployeeData = {
    meno: string,
    priezvisko: string,
    pravomoc: Pravomoc,
    oblasti?: string[],
    pozicia: string,
    fa: Fa,
    oblast: string,
    osobne_cislo: number | undefined,
    karticka: number | undefined,
    kava: Kava,
    bufetka: number | undefined,
    zfsatna: number | undefined,
    zfskrinka: number | undefined,
    winnex: number | undefined,
}

export enum Fa {
    GEFCO = 'GEFCO',
    LEASING = 'Leasing',
    AGENTURA = 'Agentura'
}

export enum Pravomoc {
    PRACOVNIK = 'Pracovnik',
    NADRIADENY = 'Nadriadeny'
}

export enum Kava {
    ANO = 'Áno',
    NIE = 'Nie'
}

export enum COLUMN_NAME  {
    datum = "datum",
    pocetDniPlatnosti = "pocetDniPlatnosti",
    skolenie = "skolenie",
    osobne_cislo = "osobne_cislo",
    priezvisko = "priezvisko", 
    meno = "meno",
    nadriadeny = "nadriadeny",
}

export type Column = {
    id: COLUMN_NAME,
    label: string,
    minWidth: number,
}

export type KonciaceSkoleniaRow = {
    datum: Date,
    pocetDniPlatnosti?: number,
    skolenie: string,
    osobne_cislo: number,
    priezvisko: string,
    meno: string,
    nadriadeny: string,
}

export type SkoleniaRow = {
    osobne_cislo: number
    priezvisko: string
    meno: string
    [key: string]: any
}