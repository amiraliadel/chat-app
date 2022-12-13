import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './routes/HomePage/Home';
import Auth from './routes/AuthPage/Auth';
import Users from './routes/UsersPage/Users';
import Login from './routes/LoginPage/Login';
import Register from './routes/RegisterPage/Register';
import NoMatch from './routes/404/NoMatch';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/*' element={<NoMatch/>}/>
        </Route>
      </Routes>
    </ AuthProvider>
  );
}

export default App;
