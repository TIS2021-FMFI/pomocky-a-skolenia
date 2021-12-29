import { DUMMY_DATA } from "../testData";
import { EmployeeData } from "../types";

export type Store = {
  skolenia: Skolenie[];
  nadriadeni: any;
  zamestnanci: EmployeeData[];
  oblasti: Oblast[];
};

type Oblast = {
  id: number;
  meno: string;
};

type Skolenie = {
  meno: string;
  priezvisko: string;
  datum: Date;
  nazov: string;
  kod: string;
  oblast: string;
  dlzka_platnosti: number;
  popis: string;
};

let store: Store = {
  skolenia: [],
  nadriadeni: {},
  zamestnanci: DUMMY_DATA,
  oblasti: [
    { id: 1, meno: "abc" },
    { id: 2, meno: "efg" },
  ],
};

export const setStore = (newStore: Store) => {
  store = newStore;
};

export const getStore = (): Store => {
  return store;
};
