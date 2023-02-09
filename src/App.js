import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Setavatar from './pages/Setavatar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/setAvatar' element={<Setavatar/>}/>
        <Route exact path='/' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

