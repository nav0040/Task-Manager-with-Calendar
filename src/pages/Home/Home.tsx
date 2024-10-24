import React from 'react'
import { motion } from "framer-motion";

import Header from '../../components/common/Header'
import TaskViewSwitcher from '../../components/TaskViewSwitcher';

const Home = () => {
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