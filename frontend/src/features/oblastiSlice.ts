import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Oblast } from '../types'

type OblastiState = {
  value: Oblast[]
}

const initialState: OblastiState = {
  value: [],
}

export const oblastiSlice = createSlice({
  name: 'oblasti',
  initialState,
  reducers: {
    setOblasti: (state, action: PayloadAction<Oblast[]>) => {
      state.value = action.payload
    },
  },
})

export const { setOblasti } = oblastiSlice.actions

export default oblastiSlice.reducer
