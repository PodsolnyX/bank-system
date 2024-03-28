import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOKEN_LS_NAME } from 'shared/config'

const initialState = {
  token: localStorage.getItem(TOKEN_LS_NAME),
  redirected: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    unsetToken(state) {
      state.token = null
    },
    finishRedirect(state) {
      state.redirected = true
    },
  },
})

export const { setToken, unsetToken, finishRedirect } = authSlice.actions
export const authReducer = authSlice.reducer
