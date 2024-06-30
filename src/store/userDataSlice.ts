import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: Number,
    username: String
}

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
        }
    }
})

export const { setUser } = userDataSlice.actions
export default userDataSlice.reducer