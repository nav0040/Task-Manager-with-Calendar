import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, DollarSign, LogOut, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";

const SIDEBAR_ITEMS = [
    {
        name: "Overview",
        icon: BarChart2,
        color: "#6366f1",
        href: "/",
    },
    { name: "Employees", icon: Users, color: "#EC4899", href: "/employees" },
    
];

const SideBar:React.FC = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();


  return (
    <motion.div
    className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : "w-20"
    }`}
    >
        
    </motion.div>
  )
}

export default SideBar