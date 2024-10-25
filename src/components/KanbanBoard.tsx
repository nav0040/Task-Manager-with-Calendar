import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from '../instances/config'
import moment from 'moment';
import { DeleteColumnOutlined, DeleteOutlined } from '@ant-design/icons';
import { Delete, DeleteIcon, LucideDelete } from 'lucide-react';
import { FiDelete } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../slices/taskSlice';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    createdBy: string;
    assignedTo: string;

}
// "PENDING",'TODO','IN_PROGRESS','IN_REVIEW','COMPLETED'
const KanbanBoard: React.FC = () => {


  const dispatch = useDispatch();


    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
        PENDING: [],
        TODO: [],
        IN_PROGRESS: [],
        IN_REVIEW: [],
        COMPLETED: [],
    });

    const fetchTasks = () => {
        axios.get('/tasks/getAll')
            .then(response => {
                const groupedTasks = {
                    PENDING: response.data.tasks.filter((task: Task) => task.status === 'PENDING'),
                    TODO: response.data.tasks.filter((task: Task) => task.status === 'TODO'),
                    IN_PROGRESS: response.data.tasks.filter((task: Task) => task.status === 'IN_PROGRESS'),
                    IN_REVIEW: response.data.tasks.filter((task: Task) => task.status === 'IN_REVIEW'),
                    COMPLETED: response.data.tasks.filter((task: Task) => task.status === 'COMPLETED'),
                };
                setTasks(groupedTasks);
            })
            .catch(error => console.error('Error fetching tasks:', error));

        // console.log(tasks);
    }
    useEffect(() => {


        fetchTasks();

    }, [tasks]);

    const onDragEnd = async (result: any) => {
        console.log(result);

        const { source, destination, draggableId } = result;

        if (!destination) return;

        const sourceStatus = source.droppableId;
        const destinationStatus = destination.droppableId;

        if (sourceStatus !== destinationStatus) {
            const task = tasks[source.droppableId][source.index];
            console.log(task);

            const newSourceTasks = Array.from(tasks[source.droppableId]);
            const newDestinationTasks = Array.from(tasks[destination.droppableId]);


            newSourceTasks.splice(source.index, 1);
            newDestinationTasks.splice(destination.index, 0, task);

            setTasks((prevTasks) => ({
                ...prevTasks,
                [source.droppableId]: newSourceTasks,
                [destination.droppableId]: newDestinationTasks,
            }));


            try {
                const res = await axios.put(`/tasks/update_order_task/${draggableId}`, {
                    newStatus: destination.droppableId,
                    sourceIndex: source.index,
                    destinationIndex: destination.index,
                })

                console.log(res);

            } catch (error) {
                console.log(error);

            }

        }

    };

 

    const deleteConfirm = async (id: any) => {
        // console.log(id);
        try {
          const { data } = await axios.delete(`/tasks/${id}`);
          dispatch(deleteTask(id))
          fetchTasks()
          toast.success(data.message);
        } catch (error) {
          toast.error(error.response.data.message)
        }
      };
    
      const deleteCancel = (e) => {
        toast.success('Cancelled');
      };
    

    return (
        <div className="p-5">
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <Toaster />

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className='grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 md:grid-cols-3  gap-4'>
                        {
                            ["PENDING", 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'].map(status => (
                                <Droppable droppableId={status} key={status}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className='bg-gray-100 p-4 rounded-lg shadow-lg'
                                        >
                                            <h2 className='font-semibold text-xs mb-3'>{status}</h2>
                                            {
                                                tasks[status]?.map((task, index) => (
                                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className='bg-white relative flex flex-col gap-4 p-4 mb-3 rounded shadow'
                                                            >
                                                                <h3 className='font-semibold text-[15px]'> {task.title}</h3>
                                                                {/* <p className="text-sm">{task.description}</p> */}
                                                                <span className='text-xs font-semibold'>
                                                                    {task.priority.toUpperCase()}
                                                                </span>
                                                                <span>
                                                                    Due Date: {moment(task.dueDate).format('YYYY-MM-DD')}
                                                                </span>
                                                                <span >
                                                                    Assigned By: {task.createdBy.name}
                                                                </span>
                                                                <span >
                                                                    Assigned To: {task.assignedTo.name}
                                                                </span>
                                                                <span className='absolute top-2 right-2'>

                                                                    <Popconfirm
                                                                        title="Delete the item"
                                                                        description="Are you sure to delete this item?"
                                                                        onConfirm={() => deleteConfirm(task._id)}
                                                                        onCancel={deleteCancel}
                                                                        okText="Yes"
                                                                        cancelText="No"
                                                                    >
                                                                        <MdOutlineDelete className='text-[30px] text-gray-500 cursor-pointer' onClick={(e) => e.stopPropagation()} />
                                                                    </Popconfirm>
                                                                  

                                                                </span>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))
                        }
                    </div>

                </DragDropContext>

            </main>

        </div>
    );
};

export default KanbanBoard;
