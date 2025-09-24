import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import { axiosInstance } from './lib/axios';
const App = () => {
  const {authUser,checkAuth}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  return (
    <div  >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/singup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/Profile" element={<ProfilePage/>} />
        <Route path="/settings" element={<SettingPage/>} />
        
      </Routes>
    </div>
  )
};

export default App
