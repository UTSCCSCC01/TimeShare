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

import InputLabel from '@mui/material/InputLabel';

import ParticlesBg from 'particles-bg'

export const SearchPost = () => {

    const [label, setLabel] = useState("");
    const [posts, setPosts] = useState([])

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    })

    const validateForm = () => {
        let formIsValid = true
        const allErrors = {}

        if (!label) {
            formIsValid = false
            allErrors['label'] = "Cannot be empty"
        }
        else {
            allErrors['label'] = ''
        }

        setErrors(allErrors)
        return formIsValid

    }

    const makePost = () => {
        // console.log(errors)
        console.log(label)

        if (!validateForm) {
            console.log("SHOULD NOT SEE THIS!")
            return
        }

        const data = {
            "label": label
        }

        const x = []

        Axios.post("http://localhost:5000/api/Timetable/GetAllPostsByLabel", data)
            .then(result => result.data)
            .then(data2 => {
                for (let j = 0; j < data2.length; j++) {
                    x.push(data2[j]);
                }
                setPosts(x)
                console.log(x)
            })
    }
    return (
        <div class="marg">
            <ParticlesBg num={5} type="circle" bg={true} />

            <h1>Search Post</h1>
            <p class="lab">Choose a Label</p>
            <FormControl class="container" onSubmit={(e) => {
                e.preventDefault();
            }}
            >


                <div class="marg2">
                    <Select
                        label="Label"
                        variant="filled"
                        style={{ width: 400, backgroundColor: "rgba(255, 255, 255, 0.85)" }}
                        required
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
                    </Select></div>
                    <div class="marg">
                    <Button type="submit" onClick={makePost} variant="contained">Search</Button>
                </div>
                <div class="marg2">
                    <ul class= "NN" id="myUL" >
                        {posts.map((item, index) => {
                            // return <li key={index} ><a href="#">{item.post_name}</a></li>;
                            return <div class="card">
                                    <div class="container2" key={index}>
                                        <p class="title"><b>{item.post_name}</b></p>
                                        <p>{item.description}</p>
                                    </div>
                            </div>;
                        })}
                    </ul>
                </div>
                
            </FormControl>

        </div>
    )

}