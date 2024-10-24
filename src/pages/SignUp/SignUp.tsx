import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Loader, Lock, Mail, User } from "lucide-react";
import axios from '../../instances/config.js'

import Input from '../../components/Input';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { register } from '../../slices/userSlice.js';

const SignUp = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [strong, setStrong] = useState(false)


    const handleSignUp = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (strong) {
            console.log('hai');
            

            try {
                const res = await axios.post('/auth/signup', {
                    email, name, password
                });
                console.log(res);

                setLoading(false);
                toast.success(res.data.message);

                dispatch(register(res.data.user))


                navigate('/');

            } catch (error) {
                // console.log(error);
                toast.error(error.response.data.message);

            }
        }else{
            toast.error("Please enter strong password");
        }

    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center h-[100vh] w-full'
        >
            <Toaster />

            <div className='p-8 w-[400px]  bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl '>
                <h2 className='text-3xl  font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
                    <Input
                        icon={User}
                        type='text'
                        placeholder='Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <PasswordStrengthMeter password={password} setStrong={setStrong} />


                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                     font-bold rounded-lg shadow-lg hover:from-green-600
                     hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                     focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={loading || !strong}

                    >
                        {loading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center items-center gap-2 mt-2 rounded-md'>
                <p className='text-sm text-gray-400'>Already have an account ? {" "}</p>
                <Link to={"/login"} className='text-green-400 hover:underline'>
                    Login
                </Link>
            </div>

        </motion.div>
    )
}

export default SignUp