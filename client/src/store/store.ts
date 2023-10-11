import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import noteReducer from './slices/noteSlice'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    "auth": authReducer,
    "notes": noteReducer,
    "filters": filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch