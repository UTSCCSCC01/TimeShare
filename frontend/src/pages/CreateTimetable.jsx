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

   <h1>hi</h1>

  )
}




