import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = () => {

  const {authUser , checkAuth , isCheckingAuth , onlineUsers} = useAuthStore()
  const {theme} = useThemeStore()

  
  useEffect(() => {
    checkAuth()
  } , [checkAuth]) 

  console.log({onlineUsers});
  console.log({authUser});

  if(isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }


  return (
    <div data-theme = {theme}>
      <Navbar />
      <Routes>
        <Route path='/'  element = {authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/signup'  element = { !authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login'  element = {!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings'  element = { <Settings />} />
        <Route path='/profile'  element = { authUser ? <Profile /> : <Navigate to='/' /> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App