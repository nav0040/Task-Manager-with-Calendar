import React from 'react';
import { Tabs } from 'antd';
// import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const { TabPane } = Tabs;

const TaskViewSwitcher: React.FC = () =>  {
    return (
      <Tabs defaultActiveKey="1" centered className=''>
        <TabPane tab="Table" key="1" className='text-white'>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Kanban" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Calendar" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  };

export default TaskViewSwitcher;