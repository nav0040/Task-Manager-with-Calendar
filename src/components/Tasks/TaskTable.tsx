import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Tag } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import moment from 'moment';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof DataType;



const statusColors:{ [key:string]:string}={
    PENDING:'grey',
    TODO:'blue',
    IN_PROGRESS:'orange',
    IN_REVIEW:'purple',
    COMPLETED:'green',
}

const TaskTable: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const {tasks} = useSelector((state:RootState)=> state.tasks);
  console.log(tasks);
  

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    //   width: '30%',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    //   width: '20%',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      ...getColumnSearchProps('dueDate'),
    render:(dueDate:string)=> moment(dueDate).format('YYYY-MM-DD')
    },
    {
        title: 'Assigned To',
        dataIndex: 'assignedTo',
        key: 'assignedTo',
        // width: '20%',
      
        render:(assignedTo:string)=> <div className='flex flex-col'>
            <span>{assignedTo.name}</span>
            <span>{assignedTo.email}</span>

        </div>
      },
      {
        title: 'Assigned By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        // width: '20%',
    
        render:(createdBy:string)=> <div className='flex flex-col'>
            <span>{createdBy.name}</span>
            <span>{createdBy.email}</span>

        </div>
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        // width: '20%',
        ...getColumnSearchProps('priority'),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        // width: '20%',
        ...getColumnSearchProps('status'),
        render:(status: string)=> <Tag color={statusColors[status]}>{status}</Tag>
      },
  ];

  return <Table<DataType> columns={columns} dataSource={tasks}  scroll={{ x: 'max-content' }} 
  pagination={{ pageSize: 5 }}  className="custom-ant-table" />;
};

export default TaskTable;