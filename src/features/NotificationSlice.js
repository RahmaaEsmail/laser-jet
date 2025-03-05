import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";
import { fetchData } from "../api/apiIntsance";
import { userApi } from "../api/userEndpoints";

 
const initialState = {
    data:[],
    loading :false,
    error:null
}

export const fetchNotifications = createAsyncThunk("notificationSlice/fetchNotification",async() => {
    const response = await fetchData({url: userApi.routes.fetchNotification})
    return response;
})

export const notificationSlice = createSlice(
    {
        name:"notificationSlice",
        initialState,
        extraReducers:(builder) => {
            builder
            .addCase(fetchNotifications.pending,(state,action) => {
                state.loading = true,
                state.error = null
            })
            .addCase(fetchNotifications.fulfilled,(state, action) => {
                state.loading = false
            })
            .addCase(fetchNotifications.rejected ,(state,action) => {
                state.loading = false,
                state.error=  action.payload
            })
        }
    }
)

export default notificationSlice.reducer;