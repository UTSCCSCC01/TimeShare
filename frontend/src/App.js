import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CreateUser } from './pages/CreateUser';
import { UpdateProfile } from './pages/UpdateProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createUser" element={<CreateUser/>} />
        <Route path="/updateProfile" element={<UpdateProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
