// import * as React from 'react'
import Timetable from 'react-timetable-events'
import ReactDOM from 'react-dom'

import React, {useState} from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import TextField from "@mui/material/TextField";
// import List from "./Components/List"
// import Search from './search';

import SearchBar from "material-ui-search-bar";

export function App2() {
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
  }
  return (
    <>
    <p>hi</p>
    {/* <SearchBar/> */}
      <CreateTimetable/>
    <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
    </>
  )
}

// const SearchBar = () => (
//   <form action="/" method="get">
//       <label htmlFor="header-search">
//           <span className="visually-hidden">Search blog posts</span>
//       </label>
//       <input
//           type="text"
//           id="header-search"
//           placeholder="Search a course..."
//           name="s" 
//       />
//       <button type="submit">Search</button>
//   </form>
// );



export const CreateTimetable = () => <Timetable 

  events={{
    monday: [
      {
        id: 1,
        name: "Custom Event 1",
        type: "custom",
        startTime: new Date("2018-02-23T11:00:00"),
        endTime: new Date("2018-02-23T14:00:00"),
      },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [
      {
        id: 1,
        name: "Danny",
        type: "custom",
        startTime: new Date("2018-02-23T11:00:00"),
        endTime: new Date("2018-02-23T14:00:00"),
      }
    ],
  }}
/>

export function Hello () {

  ReactDOM.render(
  <div
    style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}
    >
    Hello, world!
  </div>,
  <p>hi</p>
  );
  }




