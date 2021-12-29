import { getStore, setStore } from "../store/store"
import { EmployeeData } from "../types";

const be: string = process.env.REACT_APP_BACKEND_ADDRESS || ""

export const fetchEmployees = async () => {
    const store = getStore()
    const response = await fetch(be.concat("zamestnanci"));
    const data: EmployeeData[] = await response.json();
    setStore({...store, zamestnanci: data})
}