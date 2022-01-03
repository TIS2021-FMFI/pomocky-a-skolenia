import { getStore, setStore } from "../store/store"
import { EmployeeData, Oblast } from "../types";

const be: string = process.env.REACT_APP_BACKEND_ADDRESS || ""

export const fetchEmployees = async () => {
    const store = getStore()
    try{
    const response = await fetch(be.concat("zamestnanci"));
    const data: EmployeeData[] = await response.json();
    store.zamestnanci = data
    setStore(store)
    }
    catch(e){
        console.log(e);
    }
    
}

export const fetchRegions = async () => {
    const store = getStore()
    try{
    const response = await fetch(be.concat("oblasti"))
    const data: Oblast[] = await response.json()
    store.oblasti = data.filter(oblast => !!oblast.oblast)
    setStore(store)
    }
    catch(e){
        console.log(e);
    }
}