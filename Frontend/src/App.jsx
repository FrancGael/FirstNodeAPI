import './App.css'
import { Routes, Route } from'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import NavBar from './Components/NavBar'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { UserContextProvider } from '../Context/UserContext'
import ModifyPost from './Components/ModifyPost'

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.withCredentials = true
function App() {

  return (
    <UserContextProvider>
      <NavBar/>
      <Toaster position='top-center' toastOptions={{duration: 5000}}/>
      <div className='w-full h-full'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/update/:id' element={<ModifyPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </UserContextProvider>
  )
}

export default App
