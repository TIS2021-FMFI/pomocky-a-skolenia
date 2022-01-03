import * as yup from 'yup'

export const addEmployeeSchema = yup.object({
    meno: yup.string().required().min(3),
    priezvisko: yup.string().required(),
    pozicia: yup.string().required(),
    fa: yup.string().required(),
    oblast: yup.string().required(),
    osobne_cislo: yup.number().required(),
    karticka: yup.number().nullable(),
    kava: yup.string(),
    bufetka: yup.string().nullable(),
    zfsatna: yup.string().nullable(),
    zfskrinka: yup.number().nullable(),
    winnex: yup.number().nullable(),
})