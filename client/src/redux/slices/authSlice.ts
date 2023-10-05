import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface AuthState {
  isAuth: boolean;
  user: UserState;
}

interface UserState {
  userId: string | null;
  userName: string | null;
  userLogo: string | null;
}

const initialState: AuthState = {
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
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUserInfo: (state, action: PayloadAction<UserState>) => {
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
export const selectAuth = (state: RootState) => state.auth
export default counterSlice.reducer