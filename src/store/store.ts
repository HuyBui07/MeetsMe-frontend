import { configureStore } from '@reduxjs/toolkit'

// Reducers
import userReducer from "./userDataSlice"
import groupMemberModalReducer from "./groupMemberModalSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    groupMemberModal: groupMemberModalReducer
  }
})