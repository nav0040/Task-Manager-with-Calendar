import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, DollarSign, LogOut, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { logout } from '../../slices/userSlice';
import { RootState } from '../../store';

const SIDEBAR_ITEMS = [
    {
        name: "Overview",
        icon: BarChart2,
        color: "#6366f1",
        href: "/",
        roles: ["Manager", "Employee"]
    },
    {
        name: "Employees",
        icon: Users,
        color: "#EC4899",
        href: "/employees",
        roles: ["Manager"]
    },

];

const SideBar: React.FC = () => {

    const { user } = useSelector((state: RootState) => state.user);


    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const filteredNavItems = SIDEBAR_ITEMS.filter((item) => item.roles.includes(user.role) )


    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");

    }


    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : "w-20"
                }`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >

            <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                >
                    <Menu size={24} />

                </motion.button>
                <nav className='mt-8 flex-grow'>
                    {
                        filteredNavItems.map((item) => (
                            <Link key={item.href} to={item.href}>
                                <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb2'>
                                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                    <AnimatePresence>
                                        {
                                            isSidebarOpen && (
                                                <motion.span
                                                    className="ml-4 whitespace-nowrap"
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2, delay: 0.3 }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )
                                        }
                                    </AnimatePresence>
                                </motion.div>
                            </Link>



                        ))
                    }

                    <motion.div
                        className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700
                transition-colors mb-2"
                    >
                        <LogOut />

                        <AnimatePresence>
                            {isSidebarOpen && (

                                <motion.p
                                    className="ml-4 whitespace-nowrap cursor-pointer flex gap-3"
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                    onClick={logoutHandler}
                                >
                                    Logout
                                </motion.p>

                            )}
                        </AnimatePresence>
                    </motion.div>

                </nav>
            </div>

        </motion.div>
    )
}

export default SideBar