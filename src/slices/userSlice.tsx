import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface AuthState {

    user: string | null;
  }

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            Cookies.set('user', JSON.stringify(action.payload), { expires: 7 });
        },
        register: (state, action) => {
            state.user = action.payload;
            Cookies.set('user', JSON.stringify(action.payload), { expires: 7 });

        },
   
        logout: (state, action) =>{
            state.user = null;
            Cookies.remove('user');
        }
    }
})

export const { login, register,logout } = userSlice.actions;
export default userSlice.reducer;