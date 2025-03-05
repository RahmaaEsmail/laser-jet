import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../api/apiIntsance";
import { userApi } from "../api/userEndpoints";

export const fetchUsers = createAsyncThunk("usersSlice/fetchUsers", async (keywords, { rejectWithValue }) => {
    const getUrl = userApi.routes.fetchUsers
    const response = await fetchData({ url: keywords ? getUrl + `?keywords=${keywords}` : getUrl })
    return response;
})

export const createUser = createAsyncThunk("usersSlice/createUser", async (body, { rejectWithValue }) => {
    try {
        const response = await fetchData({ url: userApi.routes.createUser, method: "POST", body })
        console.log(response)
        return response
    } catch (error) {
        return rejectWithValue(error?.response?.message || "There's an error while creating user")
    }
})

export const updateUser = createAsyncThunk("usersSlice/updateUser", async (body, { rejectWithValue }) => {
    try {
        const response = await fetchData({ url: userApi.routes.updateUser, method: "PUT", body })
        return response
    } catch (error) {
        return rejectWithValue(error?.response?.message || "There's an error while updating user")
    }
})

export const deleteUser = createAsyncThunk("usersSlice/deleteUser", async (body, { rejectWithValue }) => {
    try {
        const response = await fetchData({ url: userApi.routes.deleteUsers, method: "DELETE", body })
        return response
    } catch (error) {
        return rejectWithValue(error?.response?.message || "There's an error while deleting user")
    }
})

const initialState = {
    loading: false,
    addLoading: false,
    deleteLoading: false,
    editLoading: false,
    data: [],
    error: null,
    users: [],
}

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false,
                    state.users = action.payload
            }).addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.deleteLoading = true,
                    state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteLoading = false,
                    state.users = action.payload
            }).addCase(deleteUser.rejected, (state, action) => {
                state.deleteLoading = false,
                    state.error = action.payload
            })
            .addCase(createUser.pending, (state, action) => {
                state.addLoading = true,
                    state.error = null
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.addLoading = false,
                    state.users = action.payload
            }).addCase(createUser.rejected, (state, action) => {
                state.addLoading = false,
                    state.error = action.payload
            })
            .addCase(updateUser.pending, (state, action) => {
                state.editLoading = true,
                    state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.editLoading = false,
                    state.users = action.payload
            }).addCase(updateUser.rejected, (state, action) => {
                state.editLoading = false,
                    state.error = action.payload
            })
    }
})

export default usersSlice.reducer