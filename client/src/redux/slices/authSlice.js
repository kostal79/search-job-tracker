import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  user: {
    userId: null,
    userName: null,
    userLogo: null,
  }
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
    resetUserInfo: (state) => {
      state.user = {
        userId: null,
        userName: null,
        userLogo: null,
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsAuth, setUserInfo, resetUserInfo } = counterSlice.actions

export default counterSlice.reducer