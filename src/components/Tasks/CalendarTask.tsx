import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { PopconfirmProps } from 'antd';
import moment from 'moment';
import axios from '../../instances/config';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import TaskModal from '../TaskModal';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';


const localizer = momentLocalizer(moment);


const CalendarTask: React.FC = () => {

  const { user } = useSelector((state: RootState) => state.user);
  


  const [tasks, setTasks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks/getAll');

      const mappedTasks = response.data.tasks.map((task: any) => ({
        ...task,
        title: task.title,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
      }));


      setTasks(mappedTasks);


    } catch (error) {
      console.log(error);

    }
  }


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

  // console.log(tasks);


  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.priority === 'high' ? '#f56c6c' : '#3174ad';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        padding: '5px',

      },
    };

  }

  const handleSelectEvent = (event: any) => {
    console.log(event);
    setSelectedTask(event);
    setIsEdit(true);
    setShowModal(true);

  }

  const handleSelectSlot = (slotInfo: any) => {
    // console.log(slotInfo);
    setSelectedTask({
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setIsEdit(false);
    setShowModal(true);
    console.log(selectedTask);


  }

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTask(null);
    setIsEdit(false);
  };


  useEffect(() => {
    fetchTasks();

    if (user.role == "Manager") {
      fetchEmployees();

    }
  }, [setTasks]);


  const handleSubmit = async (taskData: any) => {
    try {
      if (isEdit) {
        await axios.put(`/tasks/${selectedTask._id}`,taskData)
        toast.success('Task Updated Successfully')
        // console.log(taskData);
        
      } else {
        await axios.post('/tasks/create', taskData);
        toast.success('Task created successfully');
      }
      fetchTasks();
    } catch (error) {
      console.error(error);
      message.error('Error saving task');
    } finally {
      handleModalClose();
    }
  }

  const handleDeleteTask = async (id: any) => {
    console.log(id);
    try {
      const res = await axios.delete(`/tasks/${id}`);
      console.log(res);

      toast.success('Task deleted successfully');
      fetchTasks();

    } catch (error) {
      console.log(error);

    }

  }



  const EventComponent = ({ event }) => {
    return (
      <div className='flex justify-between mx-1 '>
        <Tooltip title={event.title}>
          <div className='flex flex-col gap-2'>
            <span>{event.title.length > 20 ? event.title.substring(0, 20) + '...' : event.title}</span>
            <span>To : {event.assignedTo?.name}</span>
          </div>
          {
            user.role == "Manager" &&
            <div className='mt-2'>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  handleDeleteTask(event._id);
                }}
                onCancel={(e) => e?.stopPropagation()}
                okText="Yes"
                cancelText="No"
              >
                <Button danger onClick={(e) => e.stopPropagation()}>Delete</Button>
              </Popconfirm>
            </div>
          }

        </Tooltip>

      </div>
    );
  };

  return (
    <div>
      <Toaster />
      {
        user.role == "Manager" ? <Calendar
          localizer={localizer}
          events={tasks}
          titleAccessor="title"
          startAccessor="start"
          endAccessor="end"
          style={{ height: 900, margin: '50px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          views={['month', 'week', 'day']}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventComponent,
          }}
        /> :
          <Calendar
            localizer={localizer}
            events={tasks}
            titleAccessor="title"
            startAccessor="start"
            endAccessor="end"
            style={{ height: 900, margin: '50px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
            views={['month', 'week', 'day']}
            eventPropGetter={eventStyleGetter}
            components={{
              event: EventComponent,
            }}
          />
      }


      <TaskModal
        visible={showModal}
        onCancel={handleModalClose}
        onSubmit={handleSubmit}
        taskData={selectedTask}
        employees={employees}
        isEdit={isEdit}
      />

      
    </div>
  )
}

export default CalendarTask