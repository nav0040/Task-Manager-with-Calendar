
import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';

import axios from '../../instances/config.js'
import { login } from '../../slices/userSlice.js';
import { RootState } from '../../store.js';


type FieldType = {
    email?: string;
    password?: string;
 
};



const Login: React.FC = () => {

  const { user } = useSelector((state:RootState)=> state.user)


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
        // console.log('Success:', values);
        setLoading(true);

        try {
            const res = await axios.post('/auth/login', values);
            console.log(res);

            setLoading(false);
            toast.success(res.data.message);

            dispatch(login(res.data.user))

            
            navigate('/');

        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
            
        }
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        if(user){
          navigate('/');
        }
      }, [user])
    
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Toaster />


            <div className='flex justify-center items-center h-[100vh]'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='w-[70%]  border-[1px] border-gray-700 py-8 flex flex-col justify-center items-center'
                >
                    <Form.Item<FieldType>

                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder='Enter your email' type='email' className='w-[300px] h-[50px]' />
                    </Form.Item>

                    <Form.Item<FieldType>

                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder='Enter your Password' className='w-[300px] h-[50px]   p-3 rounded-md ' />
                    </Form.Item>



                    <Form.Item >
                        <Button type="primary" htmlType="submit" className='mt-5 w-[300px] h-[50px]'>
                        {loading ? 'Loading...' : 'Sign In'}
                        </Button>
                    </Form.Item>
                    <Link to={'/register'} className='text-gray-400 my-2'>Don't have an account</Link>

                </Form>


            </div>


        </div>
    )
}

export default Login