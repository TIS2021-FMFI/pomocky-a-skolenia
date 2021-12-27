const keyTextDict: {[key: string]: string}= {
    "meno": "Meno",
    "priezvisko": "Priezvisko",
    "pravomoc": "Právomoc",
    "fa": "FA",	
    "oblast": "Oblasť",
    "osobne_cislo": "Osobné číslo",
    "karticka": "Kartička",
    "kava": "Káva",
    "bufetka": "Bufetka",
    "zfsatna": "ZF Šatňa",
    "zfskrinka": "ZF Skrinka",
    "winnex": "Winnex",
    "pozicia": "Pozícia",
    "vzv": "VZV",
    "datum_vydania": "Dátum vydania",
}

export const keyToText = (key: string): string => {
    const rv = keyTextDict[key]
    return rv || key
}
