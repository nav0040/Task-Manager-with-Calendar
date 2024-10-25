
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import { RootState } from './store'
import { useSelector } from 'react-redux'
import SideBar from './components/common/SideBar'
import PrivateRoute from './routes/PrivateRoute'
import Employees from './pages/Employees/Employees'

function App() {

  const {user} = useSelector((state:RootState)=> state.user);


  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'></div>
        <div className='absolute inset-0 backdrop-blur-sm'></div>
      </div>

      {
        user && <SideBar />
      }

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<PrivateRoute element={Home} />} />
        <Route path='/employees' element={<PrivateRoute element={Employees} />} />



      </Routes>
      
    </div>
  )
}

export default App
