import { motion } from "framer-motion";

import Header from '../../components/common/Header'
import TaskViewSwitcher from '../../components/Tasks/TaskViewSwitcher.tsx';
import axios from '../../instances/config.ts'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../../slices/taskSlice.tsx";

const Home = () => {

    const dispatch = useDispatch();

    const getTasks = async()=>{
        try {
            const res = await axios.get('/tasks/getAll');
            console.log(res);
            dispatch(setTasks(res.data.tasks))

            
        } catch (error) {
            
        }
    }

    useEffect(() => {
      getTasks();
    }, [])
    
    return (
        <motion.div className='flex-1 overflow-auto relative z-10'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        >
            <Header title='Overview' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <TaskViewSwitcher />

            </main>

        </motion.div>
    )
}

export default Home