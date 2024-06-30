import { configureStore } from '@reduxjs/toolkit'

// Reducers
import userReducer from "./userDataSlice"

export default configureStore({
  reducer: {
    user: userReducer
  }
})