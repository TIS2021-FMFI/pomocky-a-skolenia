import { configureStore } from '@reduxjs/toolkit'
import skoleniaZamestnancovReducer from '../features/skoleniaZamestnancovSlice'
import zamestnanciReducer from '../features/zamestnanciSlice'
import oblastiReducer from '../features/oblastiSlice'
import skoleniaReducer from '../features/skoleniaSlice'
import konciaceSkoleniaReducer from '../features/konciaceSkoleniaSlice'
import loggInReducer from '../features/loginSlice'

export const store = configureStore({
  reducer: {
    skoleniaZamestnancov: skoleniaZamestnancovReducer,
    zamestnanci: zamestnanciReducer,
    oblasti: oblastiReducer,
    skolenia: skoleniaReducer,
    konciaceSkolenia: konciaceSkoleniaReducer,
    loggin: loggInReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
