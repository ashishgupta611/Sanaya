import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    phoneNumber: null,
    password: null,
    firstName: null,
    lastName: null,
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId: string, thunkAPI) => {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return (await response.json()) as {
            id: string;
            name: string;
            email: string;
            phoneNumber: string;
            password: string;
            firstName: string;
            lastName: string;
        };
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.id = null;
            state.name = null;
            state.email = null;
            state.phoneNumber = null;
            state.password = null;
            state.firstName = null;
            state.lastName = null;
            state.error = null;
            state.loading = false;
        },
        setUser(state, action: PayloadAction<{
            id: string;
            name: string;
            email: string;
            phoneNumber: string;
            password: string;
            firstName: string;
            lastName: string;
        }>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.password = action.payload.password;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.phoneNumber = action.payload.phoneNumber;
                state.password = action.payload.password;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            });
    },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;