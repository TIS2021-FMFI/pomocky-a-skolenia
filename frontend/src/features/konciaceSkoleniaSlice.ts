import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseBeforeExpire } from '../types'

type KonciaceSkoleniaState = {
  value: CourseBeforeExpire[]
}

const initialState: KonciaceSkoleniaState = {
  value: [],
}

export const konciaceSkoleniaSlice = createSlice({
  name: 'konciaceSkolenia',
  initialState,
  reducers: {
    setKonciaceSkolenia: (
      state,
      action: PayloadAction<CourseBeforeExpire[]>
    ) => {
      state.value = action.payload
    },
  },
})

export const { setKonciaceSkolenia } = konciaceSkoleniaSlice.actions

export default konciaceSkoleniaSlice.reducer
