import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CreateTimetable } from './pages/CreateTimetable';
import { App2 } from './pages/CreateTimetable';
// import { CreateUser } from './pages/CreateUser';
import { UpdateProfile } from './pages/UpdateProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createTimetable" element={<CreateTimetable/>} />
        {/* <Route path="/createUser" element={<CreateUser/>} /> */}
        <Route path="/updateProfile" element={<UpdateProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
