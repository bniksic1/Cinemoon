import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = null
    },
    update: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
      axios.put("http://localhost:8080/api/user/plan",
          {
            id: state.user.id,
            plan:{
              id: state.user.planId
            }
          })
          .catch(err => alert(err.message))
    },
  }
});

export const { login, logout, update } = userSlice.actions;
export const selectUser = state => state.user.user;

export default userSlice.reducer;
