import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Skolenie } from '../types'

type SkoleniaState = {
  value: Skolenie[]
}

const initialState: SkoleniaState = {
  value: [],
}

export const skoleniaSlice = createSlice({
  name: 'skolenia',
  initialState,
  reducers: {
    setSkolenia: (state, action: PayloadAction<Skolenie[]>) => {
      state.value = action.payload
    },
  },
})

export const { setSkolenia } = skoleniaSlice.actions

export default skoleniaSlice.reducer
