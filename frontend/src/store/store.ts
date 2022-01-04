import { DUMMY_SKOLENIA } from "../testData";
import { EmployeeData, Oblast, SkoleniaZamestnanca } from "../types";

export type Store = {
  skoleniaZamestnancov: SkoleniaZamestnanca[];
  nadriadeni: any;
  zamestnanci: EmployeeData[];
  oblasti: Oblast[];
};

let store: Store = {
  skoleniaZamestnancov: DUMMY_SKOLENIA,
  nadriadeni: {},
  zamestnanci: [],
  oblasti: [
    { id: 1, oblast: "abc" },
    { id: 2, oblast: "efg" },
  ],
};

export const setStore = (newStore: Store) => {
  store = newStore;
};

export const getStore = (): Store => {
  return store;
};
