import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

import Header from '../../components/common/Header'
import { message } from 'antd';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import axios from '../../instances/config'
import EmployeesTable from '../../components/EmployeesTable';

const Employees:React.FC = () => {

  const {user} = useSelector((state:RootState)=> state.user);

const [employees, setEmployees] = useState<any[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/auth/all-employees');
      setEmployees(response.data.employees);
      console.log(response);


    } catch (error) {
      console.error(error);
      message.error('Error fetching employees');

    }
  }

  useEffect(() => {
    

    if (user.role == "Manager") {
      fetchEmployees();

    }
  }, []);
  return (
    <motion.div className='flex-1 overflow-auto relative z-10'
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
    >
        <Header title='Employees' />

        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          
        <EmployeesTable data={employees} />

        </main>

    </motion.div>
  )
}

export default Employees