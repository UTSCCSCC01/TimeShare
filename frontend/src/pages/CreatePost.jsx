import React, { useState } from 'react'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Paper } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { Component } from 'react'
import ParticlesBg from 'particles-bg'
import Navbar from '../components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../App2.css'


export const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [label, setLabel] = useState("");


    const [errors, setErrors] = useState({
        post_name: '',
        post_label: ''
    })

    // const data = {
    //     timetable_id:10
    // }
    // console.log("see this!")
    // let timetable = Axios.post("http://localhost:5112/api/Timetable/getTimetable", data)
    // // Axios.post("http://localhost:5112/api/Timetable/createPost")
    // console.log(timetable._id)
    // console.log(timetable.timetable_id)
    // console.log(timetable)
    const id = "62068f431286035443ce6efc"

    // Add date created to model, labels to model
    const validateForm = () => {

        console.log('hELLLOO!!!')
        let formIsValid = true
        const allErrors = {}
        console.log("HE");
        if (!title) {
            formIsValid = false
            allErrors['post_name'] = "Cannot be empty"
        }
        else {
            allErrors['post_name'] = ''
        }
        if (!label) {
            formIsValid = false
            allErrors['post_label'] = "Cannot be empty"
        }
        else {
            allErrors['post_label'] = ''
        }
        
        setErrors(allErrors)
        return formIsValid

    }

    const makePost = () => {


        if (!validateForm) {
            console.log("SHOULD NOT SEE THIS!")
            return
        }
        else {
            console.log(errors)
            console.log('fejwofejwoifewjoi')
        }


        const data = {
            "label": label,
            "name": title,
            "timetable_id": "62068f431286035443ce6efc",
            "desc": description
        }



        Axios.post("http://localhost:5000/api/Timetable/createPost", data)

        .then((res) => {
            console.log(res)
            if (res.data.errors) {
              const resErrors = {
                post_label: '',
                post_name: ''
              }
              if (res.data.errors && res.data.errors.post_label) {
                resErrors['post_label'] = res.data.errors.post_label.message
              }
              if (res.data.errors && res.data.errors.post_name) {
                resErrors['post_name'] = res.data.errors.post_name.message
              }
              console.log(resErrors)
              setErrors(resErrors)
            }
            else {
              //no errors
              //do something cool!
              console.log("COol!")
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
    }




    return (
        <div>
          
      <Navbar />
      
        

            <ParticlesBg num={5} type="circle" bg={true} />
            <h1>Create Post</h1>


            <Box
                class="container"
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 5, width: '25ch' }

                }}
                noValidate
                autoComplete="off"
            >

                <div class="marg">
                <form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
                    <TextField
                        style={{ width: 300, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                        id="title"
                        label="Title"
                        variant="filled"
                        required={true}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }} /><br></br><br></br>
                    <TextField
                        style={{ width: 400, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                    
                        label="Description"
                        variant="outlined"
                        
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        id="description"
                        multiline
                        rows={8}
                        name="description" />

                
<br></br><br></br>
                        <p class="lab">Choose a Label</p>
                        

                        <Select
                            label="Label"
                            value={label}
                            variant="filled"
                            style={{ width: 200, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                            required={true}
                            labelId="categ"
                            id="categ"
                            onChange={(e) => {
                                setLabel(e.target.value);
                            }}

                        >
                            <MenuItem value="1st-year">1st-year</MenuItem>
                            <MenuItem value="2nd-year">2nd-year</MenuItem>
                            <MenuItem value="3rd-year">3rd-year</MenuItem>
                            <MenuItem value="4th-year">4th-year</MenuItem>
                        </Select>
                    

                
                                <br></br><br></br>
                    <Button
                        type="submit"
                        onClick={() => {makePost(); console.log("H"); return 1;}}
                        variant="contained"> Post
                    </Button>
                    </form>
                </div>

            </Box>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/><br/>
        <br/>
        <br/><br/>
        <br/>
        <br/><br/>
        <br/>
        <br/><br/>
        <br/>
        <br/>
        </div>

    )
}