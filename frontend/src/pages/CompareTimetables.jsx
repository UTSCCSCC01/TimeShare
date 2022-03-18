// import * as React from 'react'
import Timetable from 'react-timetable-events'
import ReactDOM from 'react-dom'
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { blue, red } from '@material-ui/core/colors';

// const renderEvent = (event, defaultAttributes, styles) => {
//   return (
//     <div
//       {...defaultAttributes}
//       title={event.name}
//       key={event.id}
//       style={{
//         ...defaultAttributes.style,
//         backgroundColor: "red"
//       }}
//     >
//       <span className={styles.event_info}>[ {event.name} ]</span>
//       <span className={styles.event_info}>
//         {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
//       </span>
//     </div>
//   );}

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
    let csc420tut9101 = new Section(new Date("2018-02-23T21:00:00"), new Date("2018-02-23T00:00:00"), "thursday", "CSC420 PRA9101", 5, "tutorial")
    let sta420lec9101 = new Section(new Date("2018-02-23T09:00:00"), new Date("2018-02-23T11:00:00"), "thursday", "STA420 LEC9101", 6, "lecture")
    let sta420lec9102 = new Section(new Date("2018-02-23T11:00:00"), new Date("2018-02-23T12:00:00"), "friday", "STA420 LEC9102", 7, "lecture")
    let sta420tut9101 = new Section(new Date("2018-02-23T17:00:00"), new Date("2018-02-23T19:00:00"), "thursday", "STA420 PRA9101", 8, "tutorial")
    let mat420lec9101 = new Section(new Date("2018-02-23T20:00:00"), new Date("2018-02-23T22:00:00"), "thursday", "MAT420 LEC9101", 9, "lecture")
    let mat420lec9102 = new Section(new Date("2018-02-23T10:00:00"), new Date("2018-02-23T12:00:00"), "friday", "MAT420 LEC9102", 10, "lecture")
    let mat420tut9101 = new Section(new Date("2018-02-23T11:13:00"), new Date("2018-02-23T15:00:00"), "thursday", "MAT420 PRA9101", 11, "tutorial")

    let courses1 = [csc420lec9101, csc420tut9101, mat420lec9102, mat420tut9101]
    let courses2 = [sta420lec9101, sta420tut9101, mat420lec9101, mat420tut9101]
  
    const [events1, setEvents1] = useState({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    })

    const [events2, setEvents2] = useState({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    })
    const addEvents1 = () => {

      const data = {
        timetable1_id: 500,
        timetable2_id: 501
      }

      Axios.post("http://localhost:5000/api/Timetable/compareTimetables", data)
      .then((res) => {
        console.log("GOOD!")
        console.log(res);
        var shared = res.data[0]
        var sharedNotsame1 = res.data[1]
        var sharedNotsame2 = res.data[2]
        var unshared1 = res.data[3]
        var unshared2 = res.data[4]
        let cp1 = { ...events1 }
        let cp2 = { ...events2 }

        // shared courses
        for (let i = 0; i < shared.length; i++) {
          let course = shared[i]

          if (course.lecture_id) {
            let name = course.course_id + " LEC" + course.lecture_id + "(SHARED)"

            for (let j = 0; j < course.time.length; j++) {
              let day = course.time[j][0]
              console.log(day, course.time[j][1], course.time[j][2])
              let startTime = course.time[j][1]
              let endtime = course.time[j][2]

              if(startTime.length == 1) {
                startTime = "0" + startTime;
              }
              if(endtime.length == 1) {
                endtime = "0" + endtime;
              }
              const section = {
                id: i,
                name: name,
                type: "custom",
                startTime: new Date("2018-02-23T" + startTime + ":00:00"),
                endTime: new Date("2018-02-23T" + endtime + ":00:00"),
              }
              cp1[day].push(section)
              cp2[day].push(section)
            }

          } else if (course.tutorial_id) {
            let name = course.course_id + " TUT" + course.tutorial_id + "(SHARED)"
            let day = course.time[0]
            let startTime = course.time[1]
            let endtime = course.time[2]

            if(startTime.length == 1) {
              startTime = "0" + startTime;
            }
            if(endtime.length == 1) {
              endtime = "0" + endtime;
            }
            
            const section = {
              id: i,
              name: name,
              type: "custom",
              startTime: new Date("2018-02-23T" + startTime + ":00:00"),
              endTime: new Date("2018-02-23T" + endtime + ":00:00"),
            }
            cp1[day].push(section)
            cp2[day].push(section)
          }
      
        }


        // sharedNotsame1 courses
        for (let i = 0; i < sharedNotsame1.length; i++) {
          let course = sharedNotsame1[i]

          if (course.lecture_id) {
            let name = course.course_id + " LEC" + course.lecture_id + "(DIFF SECTION)"

            for (let j = 0; j < course.time.length; j++) {
              let day = course.time[j][0]
              console.log(day, course.time[j][1], course.time[j][2])
              let startTime = course.time[j][1]
              let endtime = course.time[j][2]

              if(startTime.length == 1) {
                startTime = "0" + startTime;
              }
              if(endtime.length == 1) {
                endtime = "0" + endtime;
              }
              const section = {
                id: i,
                name: name,
                type: "custom",
                startTime: new Date("2018-02-23T" + startTime + ":00:00"),
                endTime: new Date("2018-02-23T" + endtime + ":00:00"),
              }
              cp1[day].push(section)
            }

          } else if (course.tutorial_id) {
            let name = course.course_id + " TUT" + course.tutorial_id + "(DIFF SECTION)"
            let day = course.time[0]
            let startTime = course.time[1]
            let endtime = course.time[2]

            if(startTime.length == 1) {
              startTime = "0" + startTime;
            }
            if(endtime.length == 1) {
              endtime = "0" + endtime;
            }
            
            const section = {
              id: i,
              name: name,
              type: "custom",
              startTime: new Date("2018-02-23T" + startTime + ":00:00"),
              endTime: new Date("2018-02-23T" + endtime + ":00:00"),
            }
            cp1[day].push(section)
          }
      
        }


        // sharedNotsame2 courses
        for (let i = 0; i < sharedNotsame2.length; i++) {
          let course = sharedNotsame2[i]

          if (course.lecture_id) {
            let name = course.course_id + " LEC" + course.lecture_id + "(DIFF SECTION)"

            for (let j = 0; j < course.time.length; j++) {
              let day = course.time[j][0]
              console.log(day, course.time[j][1], course.time[j][2])
              let startTime = course.time[j][1]
              let endtime = course.time[j][2]

              if(startTime.length == 1) {
                startTime = "0" + startTime;
              }
              if(endtime.length == 1) {
                endtime = "0" + endtime;
              }
              const section = {
                id: i,
                name: name,
                type: "custom",
                startTime: new Date("2018-02-23T" + startTime + ":00:00"),
                endTime: new Date("2018-02-23T" + endtime + ":00:00"),
              }
              cp2[day].push(section)
            }

          } else if (course.tutorial_id) {
            let name = course.course_id + " TUT" + course.tutorial_id + "(DIFF SECTION)"
            let day = course.time[0]
            let startTime = course.time[1]
            let endtime = course.time[2]

            if(startTime.length == 1) {
              startTime = "0" + startTime;
            }
            if(endtime.length == 1) {
              endtime = "0" + endtime;
            }
            
            const section = {
              id: i,
              name: name,
              type: "custom",
              startTime: new Date("2018-02-23T" + startTime + ":00:00"),
              endTime: new Date("2018-02-23T" + endtime + ":00:00"),
            }
            cp2[day].push(section)
          }
      
        }


        // Different1 courses
        for (let i = 0; i < unshared1.length; i++) {
          let course = unshared1[i]

          if (course.lecture_id) {
            let name = course.course_id + " LEC" + course.lecture_id + "(DIFFERENT)"

            for (let j = 0; j < course.time.length; j++) {
              let day = course.time[j][0]
              console.log(day, course.time[j][1], course.time[j][2])
              let startTime = course.time[j][1]
              let endtime = course.time[j][2]

              if(startTime.length == 1) {
                startTime = "0" + startTime;
              }
              if(endtime.length == 1) {
                endtime = "0" + endtime;
              }
              const section = {
                id: i,
                name: name,
                type: "custom",
                startTime: new Date("2018-02-23T" + startTime + ":00:00"),
                endTime: new Date("2018-02-23T" + endtime + ":00:00"),
              }
              cp1[day].push(section)
            }

          } else if (course.tutorial_id) {
            let name = course.course_id + " TUT" + course.tutorial_id + "(DIFFERENT)"
            let day = course.time[0]
            let startTime = course.time[1]
            let endtime = course.time[2]

            if(startTime.length == 1) {
              startTime = "0" + startTime;
            }
            if(endtime.length == 1) {
              endtime = "0" + endtime;
            }
            
            const section = {
              id: i,
              name: name,
              type: "custom",
              startTime: new Date("2018-02-23T" + startTime + ":00:00"),
              endTime: new Date("2018-02-23T" + endtime + ":00:00"),
            }
            cp1[day].push(section)
          }
      
        }


        // Different2 courses
        for (let i = 0; i < unshared2.length; i++) {
          let course = unshared2[i]

          if (course.lecture_id) {
            let name = course.course_id + " LEC" + course.lecture_id + "(DIFFERENT)"

            for (let j = 0; j < course.time.length; j++) {
              let day = course.time[j][0]
              console.log(day, course.time[j][1], course.time[j][2])
              let startTime = course.time[j][1]
              let endtime = course.time[j][2]

              if(startTime.length == 1) {
                startTime = "0" + startTime;
              }
              if(endtime.length == 1) {
                endtime = "0" + endtime;
              }
              const section = {
                id: i,
                name: name,
                type: "custom",
                startTime: new Date("2018-02-23T" + startTime + ":00:00"),
                endTime: new Date("2018-02-23T" + endtime + ":00:00"),
              }
              cp2[day].push(section)
            }

          } else if (course.tutorial_id) {
            let name = course.course_id + " TUT" + course.tutorial_id + "(DIFFERENT)"
            let day = course.time[0]
            let startTime = course.time[1]
            let endtime = course.time[2]

            if(startTime.length == 1) {
              startTime = "0" + startTime;
            }
            if(endtime.length == 1) {
              endtime = "0" + endtime;
            }
            
            const section = {
              id: i,
              name: name,
              type: "custom",
              startTime: new Date("2018-02-23T" + startTime + ":00:00"),
              endTime: new Date("2018-02-23T" + endtime + ":00:00"),
            }
            cp2[day].push(section)
          }
      
        }

        // Set the events
        setEvents1(cp1)
        setEvents2(cp2)

        // var courses = res.data;
        // for (let i = 0; i < courses.length; i++) {
        //   let course = courses[i]
        //   let cp = { ...events1 }

        //   if (course.lecture_id) {
        //     let name = course.course_id + " LEC" + course.lecture_id + "(shared)"

        //     for (let j = 0; j < course.time.length; j++) {
        //       let day = course.time[j][0]
        //       console.log(day, course.time[j][1], course.time[j][2])
        //       let startTime = course.time[j][1]
        //       let endtime = course.time[j][2]

        //       if(startTime.length == 1) {
        //         startTime = "0" + startTime;
        //       }
        //       if(endtime.length == 1) {
        //         endtime = "0" + endtime;
        //       }

        //       cp[day].push({
        //         id: i,
        //         name: name,
        //         type: "custom",
        //         startTime: new Date("2018-02-23T" + startTime + ":00:00"),
        //         endTime: new Date("2018-02-23T" + endtime + ":00:00"),
        //       })
        //     }

        //   } else if (course.tutorial_id) {
        //     let name = course.course_id + " TUT" + course.tutorial_id
        //     let day = course.time[0]
        //     let startTime = course.time[1]
        //     let endtime = course.time[2]

        //     if(startTime.length == 1) {
        //       startTime = "0" + startTime;
        //     }
        //     if(endtime.length == 1) {
        //       endtime = "0" + endtime;
        //     }
            

        //     cp[day].push({
        //       id: i,
        //       name: name,
        //       type: "custom",
        //       startTime: new Date("2018-02-23T" + startTime + ":00:00"),
        //       endTime: new Date("2018-02-23T" + endtime + ":00:00"),
        //     })
        //   }
      
        //   setEvents1(cp)
        // }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      
    }
  
    const addEvents2 = () => {
      const data = {
        id: 501
      }

      Axios.post("http://localhost:5000/api/Timetable/getCourses", data)
      .then((res) => {
        console.log("GOOD!")
        console.log(res);
        // var courses = res.data;
        // for (let i = 0; i < courses.length; i++) {
        //   let course = courses[i]
        //   let cp = { ...events2 }

        //   if (course.lecture_id) {
        //     let name = course.course_id + " LEC" + course.lecture_id

        //     for (let j = 0; j < course.time.length; j++) {
        //       let day = course.time[j][0]
        //       console.log(cp)
        //       let startTime = course.time[j][1]
        //       let endtime = course.time[j][2]

        //       if(startTime.length == 1) {
        //         startTime = "0" + startTime;
        //       }
        //       if(endtime.length == 1) {
        //         endtime = "0" + endtime;
        //       }

        //       cp[day].push({
        //         id: i,
        //         name: name,
        //         type: "custom",
        //         startTime: new Date("2018-02-23T" + startTime + ":00:00"),
        //         endTime: new Date("2018-02-23T" + endtime + ":00:00"),
        //       })
        //       console.log(cp)
        //     }

        //   } else if (course.tutorial_id) {
        //     let name = course.course_id + " TUT" + course.tutorial_id
        //     let day = course.time[0]
        //     let startTime = course.time[1]
        //     let endtime = course.time[2]

        //     if(startTime.length == 1) {
        //       startTime = "0" + startTime;
        //     }
        //     if(endtime.length == 1) {
        //       endtime = "0" + endtime;
        //     }

        //     cp[day].push({
        //       id: i,
        //       name: name,
        //       type: "custom",
        //       startTime: new Date("2018-02-23T" + startTime + ":00:00"),
        //       endTime: new Date("2018-02-23T" + endtime + ":00:00"),
        //     })
        //   }
      
        //   setEvents2(cp)
        //   console.log(events2)
        // }
        
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      
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
      // addEvents2();
    }, []);

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