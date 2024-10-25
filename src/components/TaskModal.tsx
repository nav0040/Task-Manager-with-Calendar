import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';

const { Option } = Select;

interface TaskMOdalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (taskData: any) => void;
    taskData: any;
    employees: any;
    isEdit: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({ visible, onCancel, onSubmit, taskData, employees, isEdit }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (taskData) {
            form.setFieldsValue({
                title: taskData.title,
                description: taskData.description,
                assignedTo: taskData.assignedTo?.name,
                dueDate: taskData.start ? moment(taskData.start) : null,
                priority: taskData.priority || 'low',
                status: taskData.status || 'PENDING',
            });
        } else {
            form.resetFields();
        }
    }, [taskData, form]);


    const handleFinish = (values: any) => {
        const taskDataToSubmit = {
            ...values,
            dueDate: values.dueDate.format('YYYY-MM-DD'), // Format date for submission
        };
        onSubmit(taskDataToSubmit);
    };

    return (
        <div>
            <Modal
                title={isEdit ? 'Edit Task' : 'Create Task'}
                open={visible}
                onCancel={onCancel}
                footer={null}
            >
              <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Task Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the task title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={3} />
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

                <Form.Item
                    label="Due Date"
                    name="dueDate"
                    rules={[{ required: true, message: 'Please select a due date!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Priority"
                    name="priority"
                    rules={[{ required: true, message: 'Please select a priority!' }]}
                >
                    <Select placeholder="Select priority">
                        <Option value="low">Low</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="high">High</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select a status!' }]}
                >
                    <Select placeholder="Select status">
                        <Option value="PENDING">Pending</Option>
                        <Option value="TODO">ToDo</Option>

                        <Option value="IN_PROGRESS">In Progress</Option>
                        <Option value="IN_REVIEW">In Review</Option>

                        <Option value="COMPLETED">Completed</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {isEdit ? 'Update Task' : 'Create Task'}
                    </Button>
                </Form.Item>
            </Form>
            </Modal>
        </div>
    )
}

export default TaskModal