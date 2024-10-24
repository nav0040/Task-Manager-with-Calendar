import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import { Tabs } from 'antd';
import KanbanBoard from '../KanbanBoard';



const { TabPane } = Tabs;

const TaskViewSwitcher: React.FC = () => {

  return (
    <Tabs defaultActiveKey="1" centered className=''>
      <TabPane tab="Table" key="1" className='text-white'>
       <TaskDetails />
      </TabPane>
      <TabPane tab="Kanban" key="2">
        <KanbanBoard/>
      </TabPane>
      <TabPane tab="Calendar" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default TaskViewSwitcher;