import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeData } from '../types'

type ZamestnanciState = {
  value: EmployeeData[]
}

const initialState: ZamestnanciState = {
  value: [],
}

export const zamestnanciSlice = createSlice({
  name: 'zamestnanci',
  initialState,
  reducers: {
    setZamestnanci: (state, action: PayloadAction<EmployeeData[]>) => {
      state.value = action.payload
    },
  },
})

export const { setZamestnanci } = zamestnanciSlice.actions

export default zamestnanciSlice.reducer
