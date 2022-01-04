import { getStore, setStore } from "../store/store";
import { EmployeeData, Oblast, Skolenie } from "../types";

const be: string = process.env.REACT_APP_BACKEND_ADDRESS || "";

export const fetchEmployees = () => {
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
      (error) => {
        console.log(error);
      }
    );
};

export const removeEmployee = async (id: number) => {
  await fetch("/zmazzamestnanca", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(
      (_) => {
        fetchEmployees();
      },
      (error) => {
        console.log(error);
      }
    );
};

export const fetchSkolenia = () => {
  fetch("/skolenia", {
    method: "get",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        const store = getStore();
        const data: Skolenie[] = result;
        store.skolenia = data;
        setStore(store);
      },
      (error) => {
        console.log(error);
      }
    );
};

export const upravSkolenie = (skolenie: Skolenie) => {
  fetch("upravskolenie", {
    method: "put",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skolenie),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        fetchSkolenia();
      },
      (error) => {
        console.log(error);
      }
    );
};

export const pridajSkolenie = (skolenie: Skolenie) => {
  fetch("/pridajskolenie", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skolenie),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        fetchSkolenia();
      },
      (error) => {
        console.log(error);
      }
    );
};
