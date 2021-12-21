import { Column, COLUMN_NAME } from "./types"

export const CoursesBeforeExpireColumns: Column[] = [
    {
        id: COLUMN_NAME.datum,
        label: "Datum",
        minWidth:120,
    },
    {
        id: COLUMN_NAME.pocetDniPlatnosti,
        label: "Pocet dni platnosti",
        minWidth:120,
    },
    {
        id: COLUMN_NAME.skolenie,
        label: "Skolenie",
        minWidth:120,
    },
    {
        id: COLUMN_NAME.osobneCislo,
        label: "Osovne cislo",
        minWidth:120,
    },
    {
        id: COLUMN_NAME.priezvisko,
        label: "Priezvisko",
        minWidth:120,
    },
    {
        id: COLUMN_NAME.meno,
        label: "Meno",
        minWidth:120,
    },
    {
        id: COLUMN_NAME.nadriadeny,
        label: "Nadriadeny",
        minWidth:120,
    },

]