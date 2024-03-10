import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  mail: localStorage.getItem('email'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.mail = action.payload
    },
    unsetEmail(state) {
      state.mail = null
    },
  },
})

export const { setEmail, unsetEmail } = authSlice.actions
export const authReducer = authSlice.reducer
