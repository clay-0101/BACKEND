import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        user: null,
        isAuthenticated: null
    },

    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
        }
    }

})


export const { setAuth } = authSlice.actions
export default authSlice.reducer