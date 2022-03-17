// import * as React from 'react'
import Timetable from 'react-timetable-events'
import ReactDOM from 'react-dom'
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { blue, red } from '@material-ui/core/colors';

export const CompareTimetables = () => {
  
    class Section {
      constructor(startTime, endTime, day, name, id, type) {
        this.day = day
        this.endTime = endTime
        this.startTime = startTime
        this.name = name
        this.id = id
        this.type = type
        this.name_time = name + " - " + day.charAt(0).toUpperCase() + day.slice(1) + " " + startTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) + " to " + endTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
      }
    }
  
    // 3 dummy courses: 2 lecs and 1 tut for each
    // startime                          endtime                         day         name           id    type!=type in events which is always custom
    let csc420lec9101 = new Section(new Date("2018-02-23T11:00:00"), new Date("2018-02-23T12:00:00"), "thursday", "CSC420 LEC9101", 3, "lecture", "")
    let csc420lec9102 = new Section(new Date("2018-02-23T13:00:00"), new Date("2018-02-23T15:00:00"), "monday", "CSC420 LEC9102", 4, "lecture")
    let csc420tut9101 = new Section(new Date("2018-02-23T21:00:00"), new Date("2018-02-23T12:00:00"), "thursday", "CSC420 PRA9101", 5, "tutorial")
    let sta420lec9101 = new Section(new Date("2018-02-23T09:00:00"), new Date("2018-02-23T11:00:00"), "thursday", "STA420 LEC9101", 6, "lecture")
    let sta420lec9102 = new Section(new Date("2018-02-23T11:00:00"), new Date("2018-02-23T12:00:00"), "friday", "STA420 LEC9102", 7, "lecture")
    let sta420tut9101 = new Section(new Date("2018-02-23T17:00:00"), new Date("2018-02-23T19:00:00"), "thursday", "STA420 PRA9101", 8, "tutorial")
    let mat420lec9101 = new Section(new Date("2018-02-23T20:00:00"), new Date("2018-02-23T22:00:00"), "thursday", "MAT420 LEC9101", 9, "lecture")
    let mat420lec9102 = new Section(new Date("2018-02-23T10:00:00"), new Date("2018-02-23T12:00:00"), "friday", "MAT420 LEC9102", 10, "lecture")
    let mat420tut9101 = new Section(new Date("2018-02-23T11:13:00"), new Date("2018-02-23T15:00:00"), "thursday", "MAT420 PRA9101", 11, "tutorial")

    let courses1 = [csc420lec9101, csc420tut9101, mat420lec9102, mat420tut9101]
    let courses2 = [sta420lec9101, sta420tut9101, mat420lec9101, mat420tut9101]
  
    const [events1, setEvents1] = useState({
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    })

    const [events2, setEvents2] = useState({
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    })

    const addEvents1 = () => {
      Axios.get("http://localhost:3001/api/Timetable/getCourses", {id: 321})
      .then((res) => {
        courses1 = []
        console.log(res);
      })
      .catch((error) => {
        courses1 = []
        console.log("Error:", error);
      });
      for (let i = 0; i < courses1.length; i++) {
        let course = courses1[i]
        let day = course.day
        let cp = { ...events1 }
        cp[day].push({
          id: course.id,
          name: course.name,
          type: "custom",
          startTime: course.startTime,
          endTime: course.endTime,
        })
    
        setEvents1(cp)
        //console.log(events)
      }
      
    }
  
    const addEvents2 = () => {
      for (let i = 0; i < courses2.length; i++) {
        let course = courses2[i]
        let day = course.day
        console.log(events2)
        let cp = { ...events2 }
        cp[day].push({
          id: course.id,
          name: course.name,
          type: "custom",
          startTime: course.startTime,
          endTime: course.endTime,
        })
    
        setEvents2(cp)
        //console.log(events)
      }
      
    }
    
    const styles = {
      splitScreen: {
        display: 'flex',
        flexDirection: 'row'
      },
      leftPane: {
          // backgroundColor: "#44014C",
          margin: '5px',
          width: '50%',
          height: '100%',
          // resizeMode: 'contain',
      },
      rightPane: {
          // backgroundColor: "#20c997",
          margin: '5px',
          width: '50%',
          height: '100%',
          // resizeMode: 'contain',
      },
    }
    
    // on page load, calls the functions to display courses on each timetable
    useEffect(() => {
      addEvents1();
      addEvents2();
    }, []);

    // renderEvent(event, defaultAttributes, styles) {
    //   return (
    //     <div
    //       {...defaultAttributes}
    //       title={event.name}
    //       key={event.id}
    //       style={{
    //         ...defaultAttributes.style,
    //         backgroundColor: "blue"
    //       }}
    //     >
    //       <span className={styles.event_info}>[ {event.name} ]</span>
    //       <span className={styles.event_info}>
    //         {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
    //       </span>
    //     </div>
    //   );
    // }

    return (
  
      <><><div><nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">TimeShare</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Feed</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">edit profile</a></li>
                <li><a class="dropdown-item" href="#">blah</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">blah</a></li>
              </ul>
            </li>
  
          </ul>
  
        </div>
      </div>
    </nav>
    </div><div class="timetable">    <br /><br />
  
  
  
        <h1>Timetable Comparison</h1>    <br /><br />
        <link rel="stylesheet" href="../App.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
  
        {/* <ul id="myUL" style={{ maxHeight: 200, overflow: 'auto' }}>
        {courses1.map((item, index) => {
          return <li key={index} onClick={(e) => {
            e.preventDefault();
            addEvents1()
            addEvents2()
          } }><a href="#">{item.name_time}</a></li>;
        })}
        </ul> */}
        
        <div style={styles.splitScreen}>
          <div style={styles.leftPane}>
            <Timetable id="tt1" events={events1} />
          </div>
          <div style={styles.rightPane}>
            <Timetable id="tt2" events={events2} />
          </div>
        </div>

        <br />
        <br />



        <footer>
  <p class="text-center">Copyright 2022 &copy; TimeShare</p>
  </footer>
        
      </div></><div>
       </div></>
  
    )
  }