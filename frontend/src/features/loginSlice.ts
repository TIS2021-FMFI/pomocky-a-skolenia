import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LoginStat = {
  loggedIn: boolean
}

const initialState: LoginStat = {
  loggedIn: false,
}

export const loginSlice = createSlice({
  name: 'loggin',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
  },
})

export const { setLoggedIn } = loginSlice.actions

export default loginSlice.reducer
