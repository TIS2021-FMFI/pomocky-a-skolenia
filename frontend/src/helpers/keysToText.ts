const keyTextDict: { [key: string]: string } = {
  meno: 'Meno',
  priezvisko: 'Priezvisko',
  pravomoc: 'Právomoc',
  fa: 'FA',
  oblast: 'Oblasť',
  osobne_cislo: 'Osobné číslo',
  karticka: 'Kartička',
  kava: 'Káva',
  bufetka: 'Bufetka',
  zfsatna: 'ZF Šatňa',
  zfskrinka: 'ZF Skrinka',
  winnex: 'Winnex',
  pozicia: 'Pozícia',
  vzv: 'VZV',
  datum_vydania: 'Dátum vydania',
  kod_skolenia: 'Kód školenia',
  datum_absolvovania: 'Dátum absolvovania',
  koniec_platnosti: 'Koniec platnosti',
  dlzka_platnosti: 'Dĺžka platnosti',
  pocet_dni_platnosti: 'Počet dní platnosti',
  nazov: 'Názov',
  popis: 'Poips',
  Agentura: 'Agentúra',
  leasing: 'Leasing',
}

export const keyToText = (key: string): string => {
  const rv = keyTextDict[key]
  return rv || key
}
