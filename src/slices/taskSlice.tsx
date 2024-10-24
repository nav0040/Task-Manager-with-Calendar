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
        }
       
    }
});


export const { setTasks,addTask } = taskSlice.actions;
export default taskSlice.reducer;