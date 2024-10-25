import React, { useEffect, useState } from 'react'
import TaskTable from './TaskTable';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import axios from '../../instances/config'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addTask } from '../../slices/taskSlice';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
const { Option } = Select;

const TaskDetails: React.FC = () => {
    const {user} = useSelector((state:RootState)=> state.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);

    const dispacth = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };



    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSave = async (values: any) => {
        const newTask = { ...values, dueDate: values.dueDate.format('YYYY-MM-DD') }
        try {
            // console.log(newTask);
            const res = await axios.post('/tasks/create', newTask);
            console.log(res);


            setIsModalOpen(false);
            dispacth(addTask(res.data.task))
            toast.success('Task created successfully')

        } catch (error) {
            toast.error(error.response.message)
        }

    }


    const fetchEmployees = async () => {
        try {
          const response = await axios.get('/auth/all-employees',{withCredentials: true});
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
        <div>
            <Toaster />
            {user.role === "Manager" && <div className='flex justify-end'>
                <button
                    onClick={showModal}
                    className=' border border-gray-500 my-2 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl hover:bg-gray-800 px-6 py-4 leading-3 tracking-[1px]'>
                    Create Task
                </button>

            </div>}
            <Modal title="Create Task" open={isModalOpen} footer >

                <Form
                    layout='vertical'
                    initialValues={{ status: 'PENDING', priority: 'low' }}
                    onFinish={handleSave}
                >

                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input />
                    </Form.Item>

                    <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select due date' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                    label="Assign To"
                    name="assignedTo"
                    rules={[{ required: true, message: 'Please select an employee!' }]}
                >
                    <Select placeholder="Select an employee">
                        {employees.map((employee) => (
                            <Option key={employee._id} value={employee._id}>
                                {employee.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                    <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                        <Select>
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="status" label="Status">
                        <Select>
                            <Option value="PENDING">Pending</Option>
                            <Option value="TODO">To Do</Option>
                            <Option value="IN_PROGRESS">In Progress</Option>
                            <Option value="IN_REVIEW">In Review</Option>
                            <Option value="COMPLETED">Completed</Option>
                        </Select>
                    </Form.Item>

                    <div className='flex gap-4 justify-end'>

                        <Button type="primary" htmlType="submit">
                            {'Create Task'}
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>

                </Form>
            </Modal>
            <TaskTable />
        </div>
    )
}

export default TaskDetails