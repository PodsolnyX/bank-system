import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ID_LS_NAME } from 'shared/config'

const initialState = {
  id: localStorage.getItem(ID_LS_NAME),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload
    },
    unsetId(state) {
      state.id = null
    },
  },
})

export const { setId, unsetId } = authSlice.actions
export const authReducer = authSlice.reducer
