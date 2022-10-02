import './App.css';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Front from './pages/Front';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/User';
import Main from './pages/Main';
import Workspace from './pages/Workspace';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
          <Routes>
            <Route exact path="/" element={<Front/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/register" element={<Register/>}></Route>
            {/* <Route exact path="/app/home" element={<Home/>}></Route>
            <Route exact path="/app/workspace/:id" element={<Workspace/>}></Route> */}
            <Route exact path="/app/*" element={<Main/>}></Route>
            
          </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
