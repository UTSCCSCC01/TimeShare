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
import Navbar from '../components/navbar';


import InputLabel from '@mui/material/InputLabel';

import ParticlesBg from 'particles-bg'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

let temp = 0

export const ViewPost = () => {
  // const [posts, setPosts] = useState([])
  // const {postId} = useParams()
  // console.log(useParams()['postId'])
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const [posts, setComments] = useState([])
  const [flag, setFlag] = useState(0)

  //  const [time, setTime] = useState("");



  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }


  class Section {
    constructor(startTime, endTime, day, name, id, type) {
      this.day = day
      this.endTime = endTime
      this.startTime = startTime
      this.name = name
      this.id = id
      this.type = type
      this.name_time = name + " - " + day.charAt(0).toUpperCase() + day.slice(1) + " " + startTime.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + " to " + endTime.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
    }
  }

  // const [link, setLink] = useState("");


  let text1 = "http://localhost:5013/api/Timetable/getPost2/";
  let text2 = useParams()['postId'];
  let result = text1.concat(text2);
  console.log(result)

  // setLink(result)

  // // const [title, setTitle] = useState("");
  // // const [desc, setdesc] = useState("");


  // useEffect(() => {
  //     getPost();
  //  }, []);
  // let temp = ""
  // let temp2 = ""
  // const getPost = (temp) => {


  // Axios.get(result)


  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    Axios.get(result)
      .then(res => setTitle(res.data['post_name']))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    Axios.get(result)
      .then(res => setDesc(res.data['description']))
      .catch(err => console.log(err));
  }, [])
  // }   
  console.log(title)

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

  // let title = "title of post"

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

  const addComment = () => {



    
    const data = {
      "content": content,
      "post_id": text2,
      "user_id": localStorage.getItem('user-id')
    }


    const x = []
    if (content.length > 0) {

      Axios.post("http://localhost:5013/api/Timetable/createComment", data)
        .then(result => result.data)
        .then(data2 => {
          console.log(data2)
          for (let j = 0; j < data2.length; j++) {
            x.push(data2[j]);
          }
          console.log(x)
          setComments(x)
        })
    }
  }

  const data = {
    "post_id": text2,

  }

  if (flag == 0) {
    const x = []
    Axios.post("http://localhost:5013/api/Timetable/getComment", data)
      .then(result => result.data)
      .then(data2 => {
        console.log("HERE")
        console.log(data2)
        for (let j = 0; j < data2.length; j++) {
          x.push(data2[j]);
        }
        console.log(x)
        setComments(x)
        setFlag(1)
      })

  }

  // const x = []
  //   Axios.post("http://localhost:5011/api/Timetable/getComment", data)
  //   .then(result => result.data)
  //     .then(data2 => {
  //       console.log("HERE")
  //       for (let j = 0; j < data2.length; j++) {
  //         x.push(data2[j]);
  //       }
  //       console.log(x)
  //       setComments(x)
  //     })
  const style2 = {

    width: "100%",
    height: "100%",
    position: "fixed",
    "z-index": "-1",
    top: "0px",
    left: "0px",


  };

  return (
    <div>
      <Navbar />
       <ParticlesBg num={5} type="circle" id="particles-js" bg={{
  position: "fixed",
  zIndex: "-1",
  width: "100%"
}} />
    
    <div class="marg3">
     

      {/* <canvas class="particles-bg-canvas-self" style={style2} width="897" height="755"></canvas> */}
      <h1 class="marg4">{title}</h1>
      <p class="marg4">{desc}</p>

      <Timetable class="timetable2"

        events={events} />

      <div class="container3">
        {/* <div class="label">
          Share Post
        </div> */}
        <br></br>
        <div class="marg">
          <div class="copy-text">
            <input type="text" class="text" value="http://localhost:3001/viewPost/234123" readonly></input>
            <button onClick={copy}>
              <i class="">Share</i>
            </button>
          </div>
          <h1>Comment Section</h1>
          <FormControl class="container">
            <div class="marg2">
              <TextField
                style={{ width: 600, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                id="title"
                label="Comment..."
                variant="filled"

                onChange={(e) => {
                  setContent(e.target.value);
                }} /> <br></br><br></br>
              <Button
                type="submit"
                onClick={() => { addComment(); console.log("H"); return 1; }}
                variant="contained"> Add Comment!
              </Button>

              <br></br><br></br>
              <ul class="NN2" id="myUL" >
                {posts.slice(0).reverse().map((item, index) => {
                  // return <li key={index} ><a href="#">{item.post_name}</a></li>;
                  return <div class="card" key={index}>
                    <div class="container2" key={index} >

                      {/* <p class="title"><b>{item.post_name}</b></p> */}
                      <b>{item.commenter ? item.commenter: 'Anonymous user'} commented:</b>
                      <p>{item.content}</p>
                      <p>{item.time}</p>
                    </div>
                  </div>;
                })}
              </ul>
            </div>
          </FormControl>
        </div>

      </div>
    </div>
    </div>
  )

}