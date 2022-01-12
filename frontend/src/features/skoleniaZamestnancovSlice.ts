import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SkoleniaZamestnanca } from '../types'

type SkoleniaZamestnancovState = {
  value: SkoleniaZamestnanca[]
}

const initialState: SkoleniaZamestnancovState = {
  value: [],
}

export const skoleniaZamestnancovSlice = createSlice({
  name: 'skoleniaZamestnancov',
  initialState,
  reducers: {
    setSkoleniaZamestnancov: (
      state,
      action: PayloadAction<SkoleniaZamestnanca[]>
    ) => {
      state.value = action.payload
    },
  },
})

export const { setSkoleniaZamestnancov } = skoleniaZamestnancovSlice.actions

export default skoleniaZamestnancovSlice.reducer
