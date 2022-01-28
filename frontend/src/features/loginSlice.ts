import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LoginStat = {
  loggedIn: boolean
  isAdmin: boolean
}

const initialState: LoginStat = {
  loggedIn: false,
  isAdmin: false,
}

export const loginSlice = createSlice({
  name: 'loggin',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
  },
})

export const { setLoggedIn, setIsAdmin } = loginSlice.actions

export default loginSlice.reducer
