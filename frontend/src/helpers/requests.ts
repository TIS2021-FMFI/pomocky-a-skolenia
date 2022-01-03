import { getStore, setStore } from "../store/store";
import { EmployeeData, Oblast } from "../types";

const be: string = process.env.REACT_APP_BACKEND_ADDRESS || "";

export const fetchEmployees = async () => {
  fetch("/zamestnanci", {
    method: "get",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log("RES", result);
        const store = getStore();
        const data: EmployeeData[] = result;
        store.zamestnanci = data;
        setStore(store);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    );
};

export const fetchRegions = async () => {
  const store = getStore();
  try {
    const response = await fetch(be.concat("oblasti"));
    const data: Oblast[] = await response.json();
    store.oblasti = data.filter((oblast) => !!oblast.oblast);
    setStore(store);
  } catch (e) {
    console.log(e);
  }
};

export const addEmployee = (employee: EmployeeData) => {
  fetch("/pridajzamestnanca", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        fetchEmployees();
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    );
};
