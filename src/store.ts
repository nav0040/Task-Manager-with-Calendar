import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import taskReducer from "./slices/taskSlice.js";


const store = configureStore({
    reducer:{
        user:userReducer,
        tasks:taskReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;