// import * as React from 'react'
import Timetable from 'react-timetable-events'
import ReactDOM from 'react-dom'
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from 'react'


// -------

export const CreateTimetable = () => {

  const [search, setSearch] = useState("");

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
  let csc420tut9103 = new Section(new Date("2018-02-23T21:00:00"), new Date("2018-02-23T12:00:00"), "thursday", "CSC420 PRA9101", 5, "tutorial")
  let sta420lec9101 = new Section(new Date("2018-02-23T09:00:00"), new Date("2018-02-23T11:00:00"), "thursday", "STA420 LEC9101", 6, "lecture")
  let sta420lec9102 = new Section(new Date("2018-02-23T11:00:00"), new Date("2018-02-23T12:00:00"), "friday", "STA420 LEC9102", 7, "lecture")
  let sta420tut9103 = new Section(new Date("2018-02-23T17:00:00"), new Date("2018-02-23T19:00:00"), "thursday", "STA420 PRA9101", 8, "tutorial")
  let sci420lec9101 = new Section(new Date("2018-02-23T20:00:00"), new Date("2018-02-23T22:00:00"), "thursday", "MAT420 LEC9101", 9, "lecture")
  let sci420lec9102 = new Section(new Date("2018-02-23T10:00:00"), new Date("2018-02-23T12:00:00"), "friday", "MAT420 LEC9102", 10, "lecture")
  let sci420tut9103 = new Section(new Date("2018-02-23T11:13:00"), new Date("2018-02-23T15:00:00"), "thursday", "MAT420 PRA9101", 11, "tutorial")

  let courses = [csc420lec9101, csc420lec9102, csc420tut9103, sta420lec9101, sta420lec9102, sta420tut9103, sci420lec9101, sci420lec9102, sci420tut9103]


  const [events, setEvents] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  })

  const addEvent = (index) => {
    let course = courses[index]
    let day = course.day
    console.log(events)
    let cp = { ...events }
    cp[day].push({
      id: course.id,
      name: course.name,
      type: "custom",
      startTime: course.startTime,
      endTime: course.endTime,
    })

    setEvents(cp)
    //console.log(events)
  }

  function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }


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



      <h1>Timetable Builder</h1>    <br /><br />
      <link rel="stylesheet" href="../App.css" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
      <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for a course" />

      <ul id="myUL" style={{ maxHeight: 200, overflow: 'auto' }}>
        {courses.map((item, index) => {
          return <li key={index} onClick={(e) => {
            e.preventDefault();
            addEvent(index);
          } }><a href="#">{item.name_time}</a></li>;
        })}
      </ul>

      <br /><br />

      <div>
        <Timetable class="timetable2"

          events={events} />
      </div>
      <footer>
<p class="text-center">Copyright 2022 &copy; TimeShare</p>
</footer>
      
    </div></><div>
     </div></>

  )
}



