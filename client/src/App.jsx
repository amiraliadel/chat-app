import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './routes/HomePage/Home';
import Auth from './routes/AuthPage/Auth';
import Login from './routes/LoginPage/Login';
import Register from './routes/RegisterPage/Register';
import NoMatch from './routes/404/NoMatch';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/*' element={<NoMatch/>}/>
    </Routes>
  );
}

export default App;
