import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom';
const App = () => {
  return (
    <div className='text-red-520' >
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/singup' element={<SingUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/login' element={<ProfilePage/>} />
        <Route path='/settings' element={<SettingPage/>} />
        
      </Routes>
    </div>
  )
}

export default App
