import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { LogIn } from './pages/LogIn';

import { CreateTimetable } from './pages/CreateTimetable';
import { App2 } from './pages/CreateTimetable';
import { UpdateProfile } from './pages/UpdateProfile';
import { CompareTimetables } from './pages/CompareTimetables';
import { PubProfileView, PrivProfileView } from './pages/ViewProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/updateProfile" element={<UpdateProfile/>} />
        <Route path="/createTimetable" element={<CreateTimetable/>} />
        <Route path="/compareTimetables" element={<CompareTimetables/>} />
        <Route path="/profile/" element={<PrivProfileView />}/>
        <Route path="/profile/:username" element={<PubProfileView/>} />
      </Routes>
    </Router>
  )}

export default App;
