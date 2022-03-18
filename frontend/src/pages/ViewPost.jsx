import React, { useState } from 'react'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Slider from "@material-ui/core/Slider";
import Box from '@mui/material/Box';
import { Component } from 'react'
import Timetable from 'react-timetable-events'

import InputLabel from '@mui/material/InputLabel';

import ParticlesBg from 'particles-bg'
import { useParams } from 'react-router-dom';
import {useEffect } from 'react';



export const ViewPost = () => {
    // const [posts, setPosts] = useState([])
    // const {postId} = useParams()
    // console.log(useParams()['postId'])

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

    let text1 = "http://localhost:5000/api/Timetable/getPost2/";
    let text2 = useParams()['postId'];
    let result = text1.concat(text2);
    console.log(result)

    // // const [title, setTitle] = useState("");
    // // const [desc, setdesc] = useState("");

    
    // useEffect(() => {
    //     getPost();
    //  }, []);
    // let temp = ""
    // let temp2 = ""
    // const getPost = (temp) => {
    // Axios.get(result).then(result => result.data)
    // .then(data => { 
        
    //     console.log(data)
    // })
    // }   
    

    // const displayPost = (temp) => {
    //     console.log(temp)
    //     setTitle(temp['post_name'])
    //     setdesc(temp['description'])
    //     console.log(title)
    //     console.log(desc)
    // }

    // getPost()

    // console.log(Axios.get(result))
    // let title = temp[0]['post_name']
    // console.log(title)
    // console.log(temp)
    // console.log(temp[0])
    // let real_data = temp[0]
    // console.log(real_data)


    // let textt1 = "<h1>";
    // let textt2 = real_data['post_name'];
    // let resultt = textt1.concat(textt2);

    // let title = resultt.concat("<h1>")
    // console.log(title)
    // console.log(real_data['post_name'])
    // return (
    //     <div>
    //         <h1>{}</h1>
    //     </div>

    // )

    let title = "title of post"

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
      
    let events = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
      }

      const addEvent = (index) => {
        let course = courses[index]
        let day = course.day
        console.log(events)
        
        events[day].push({
          id: course.id,
          name: course.name,
          type: "custom",
          startTime: course.startTime,
          endTime: course.endTime,
        })
    
        
        //console.log(events)
      }

    addEvent(0)
    addEvent(1)
    addEvent(2)
    addEvent(3)
    addEvent(4)
    
    let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere turpis metus, eu luctus dolor tincidunt quis. Duis viverra odio ut pretium sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet pretium lorem, nec gravida arcu aliquet in. Duis quis molestie augue. Cras vestibulum sodales sodales. Morbi rhoncus tempor neque, ac rutrum lacus vehicula quis. Ut malesuada, nunc scelerisque volutpat facilisis, arcu risus convallis libero, quis ultrices quam ex id nisl. Donec congue turpis vel libero feugiat, sit amet dignissim turpis dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae"
    return (
        <div class="marg3">
          <ParticlesBg num={5} type="circle" bg={true} />
        <h1 class="marg4">{title}</h1>
         <p class="marg4">{description}</p>

        <Timetable class="timetable2"
          
          events={events} />
      </div>
    )

}