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

export const SearchPost = () => {

    const [label, setLabel] = useState("");

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
        console.log(errors)
        console.log(label)

        if (!validateForm) {
            console.log("SHOULD NOT SEE THIS!")
            return
        }

        const data = {
            "label": label     
        }

        temp = Axios.get("http://localhost:5112/api/Timetable/GetAllPostsByLabel", data)
        print(temp)

        

              
    }
    return (
        <div>
            <h1>Search Post</h1>
            <FormControl class="container" onSubmit={(e) => {
            e.preventDefault();
          }}
            > 
            <label for="label">Choose a label:</label>
                    <Select class="input" id="label" name="label" required onChange={(e) => {
                    setLabel(e.target.value);
                  }}>
                    <MenuItem value="1st-year">1st-year</MenuItem>
                    <MenuItem value="2nd-year">2nd-year</MenuItem>
                    <MenuItem value="3rd-year">3rd-year</MenuItem>
                    <MenuItem value="4th-year">4th-year</MenuItem>
                    </Select>  
                 <br></br>
                <Button type="submit" onClick={makePost}>Create Post</Button>  
                </FormControl>  

        </div>
    )
                   
}