import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './routes/HomePage/Home';
import Auth from './routes/AuthPage/Auth';
import Login from './routes/LoginPage/Login';
import Register from './routes/RegisterPage/Register';
import Guest from './routes/GuestPage/Guest';
import NoMatch from './routes/404/NoMatch';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
          </Route>
          <Route path='/guest' element={<Guest/>}/>
          <Route path='/*' element={<NoMatch/>}/>
        </Route>
      </Routes>
    </ AuthProvider>
  );
}

export default App;
