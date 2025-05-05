import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const predefinedUsers = [
  { id: 1, name: "John Joseph israel", email: "dadoy@gmail.com" },
  { id: 2, name: "Coedy de la cruz", email: "cocoy@gmail.com" },
  { id: 3, name: "Nerjie Angelo Mecantina", email: "jieboy.com" },
  { id: 4, name: "Ralph Richmond Amarillo", email: "rr@gmail.com" },

];


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise(resolve => setTimeout(resolve, 5000)); 
  return predefinedUsers;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    addUser: (state, action) => {
      const newUser = {
        id: Date.now(),
        ...action.payload
      };
      state.users.push(newUser);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { deleteUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;