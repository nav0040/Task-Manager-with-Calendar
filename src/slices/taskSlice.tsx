import { createSlice } from '@reduxjs/toolkit';


const initialState ={
    tasks:[]
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        setTasks:(state,action)=>{
            state.tasks = action.payload
        },
        addTask:(state,action)=>{
            state.tasks.push(action.payload)
        },
        deleteTask:(state,action)=>{
            state.tasks = state.tasks.filter((item) => item._id !== action.payload)
        }
       
    }
});


export const { setTasks,addTask,deleteTask } = taskSlice.actions;
export default taskSlice.reducer;