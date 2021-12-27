const keyTextDict: {[key: string]: string}= {
    "meno": "Meno",
    "priezvisko": "Priezvisko",
    "pravomoc": "Právomoc",
    "fa": "FA",	
    "oblast": "Oblasť",
    "osobneCislo": "Osobné číslo",
    "karticka": "Kartička",
    "kava": "Káva",
    "bufetka": "Bufetka",
    "zfSatna": "ZF Šatňa",
    "zfSkrinka": "ZF Skrinka",
    "winnex": "Winnex",
    "pozicia": "Pozícia",

}

export const keyToText = (key: string): string => {
    const rv = keyTextDict[key]
    return rv || key
}
