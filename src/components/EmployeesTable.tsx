import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';

const EmployeesTable: React.FC = ({ data }) => {
    console.log(data);



    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingData, setEditingData] = useState({});


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}

            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
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
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
            render:(text,record)=>(
                <div className='flex items-center gap-3'>
                    <img src={record.photo} alt="" className='rounded-full w-[50px] h-50px]' />
                    <span>{record.name}</span>
                </div>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '10%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '10%',
            ...getColumnSearchProps('role'),
        },

        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '10%',
            render: (createdAt) => moment(createdAt).format('YYYY-MM-DD'),

        },
    
        // {
        //   title: 'Action',
        //   dataIndex: 'action',
        //   key: 'action',
        //   width: '10%',
        //   render: (text, record) => (
        //     <div className='flex gap-4'>
        //       <Popconfirm
        //         title="Delete the Customer"
        //         description="Are you sure to delete this item?"
        //         onConfirm={() => confirm(record._id)}
        //         onCancel={cancel}
        //         okText="Yes"
        //         cancelText="No"
        //       >
        //         <AiOutlineDelete className='text-[25px] cursor-pointer' />
        //       </Popconfirm>

        //       <CiEdit className='text-[25px] cursor-pointer' onClick={()=>showLoading(record)} />
        //       <EditModal
        //         showLoading={showLoading}
        //         loading={loading}
        //         editingData={editingData}
        //         setLoading={setLoading}
        //         setOpen={setOpen}
        //         open={open}
        //         handleOk={handleOk}
        //         handleCancel={handleCancel}
        //       />
        //     </div>
        //   )
        // },
    ];








    return (
        <Table columns={columns} dataSource={data} rowKey={(record) => record._id} className="custom-ant-table" />

    )
}

export default EmployeesTable