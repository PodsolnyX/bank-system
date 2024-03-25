import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOKEN_LS_NAME } from 'shared/config'

const initialState = {
  token: localStorage.getItem(TOKEN_LS_NAME),
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
  },
})

export const { setToken, unsetToken } = authSlice.actions
export const authReducer = authSlice.reducer
