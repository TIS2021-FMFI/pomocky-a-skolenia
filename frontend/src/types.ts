export type EmployeeData = {
    id: number,
    meno: string,
    priezvisko: string,
    pravomoc: Pravomoc,
    oblasti?: string[],
    pozicia: string,
    fa: Fa,
    oblast: string,
    osobneCislo: number | undefined,
    karticka: number | undefined,
    kava: Kava,
    bufetka: number | undefined,
    zfSatna: number | undefined,
    zfSkrinka: number | undefined,
    winnex: number | undefined,
}

export enum Fa {
    GEFCO = 'Gefco',
    LEASING = 'Leasing',
    AGENTURA = 'Agentura'
}

export enum Pravomoc {
    PRACOVNIK = 'Pracovnik',
    NADRIADENY = 'Nadriadeny'
}

export enum Kava {
    ANO = 'Ano',
    NIE = 'Nie'
}

export enum COLUMN_NAME  {
    datum = "datum",
    pocetDniPlatnosti = "pocetDniPlatnosti",
    skolenie = "skolenie",
    osobneCislo = "osobneCislo",
    priezvisko = "priezvisko", 
    meno = "meno",
    nadriadeny = "nadriadeny",
}

export type Column = {
    id: COLUMN_NAME,
    label: string,
    minWidth: number,
}

export type BeforeExpireRow = {
    datum: Date,
    pocetDniPlatnosti?: number,
    skolenie: string,
    osobneCislo: number,
    priezvisko: string,
    meno: string,
    nadriadeny: string,
}