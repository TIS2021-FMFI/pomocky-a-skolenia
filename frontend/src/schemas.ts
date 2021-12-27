import * as yup from 'yup'

export const addEmployeeSchema = yup.object({
    meno: yup.string().required().min(3),
    priezvisko: yup.string().required(),
    pravomoc: yup.string().required(),
    oblasti: yup.array(),
    pozicia: yup.string().required(),
    fa: yup.string().required(),
    oblast: yup.string().required(),
    osobne_cislo: yup.number().required(),
    karticka: yup.number(),
    kava: yup.string(),
    bufetka: yup.number(),
    zfsatna: yup.number(),
    zfskrinka: yup.number(),
    winnex: yup.number(),
})