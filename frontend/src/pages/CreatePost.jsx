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


export const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [label, setLabel] = useState("");


    const [errors, setErrors] = useState({
        title: '',
        description: ''
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
        let formIsValid = true
        const allErrors = {}
        if (!title) {
            formIsValid = false
            allErrors['title'] = "Cannot be empty"
        }
        else {
            allErrors['label'] = ''
        }
        if (!title) {
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
        console.log(title)
        console.log(description)
        console.log(label)
        if (!validateForm) {
            console.log("SHOULD NOT SEE THIS!")
            return
        }
        
        const data = {
            "label": label,
            "name": title,
            "timetable_id": "62068f431286035443ce6efc",
            "desc": description
        }

        Axios.post("http://localhost:5112/api/Timetable/createPost", data)
        
 
    }
    
  
    
  
    return (
        <div>
            <h1>Create Post</h1>
            <FormControl class="container" onSubmit={(e) => {
            e.preventDefault();
          }}
            >   
                    
 
                    
                    <TextField label="Post Title" class="input" id="title" variant="filled" 
                    error={errors.username !== ''} helperText={errors.username}
                 required onChange={(e) => {
                    setTitle(e.target.value);
                  }}/>  
                  <br></br>
                  <hr></hr>

  
                    <label for="description" required> Description </label>  
                    <TextField class="input" required label="Filled" variant="filled" onChange={(e) => {
                    setDescription(e.target.value);
                  }} id="description" type="textarea" name="description"/>

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

            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <div>
        <TextField 
            label="Post Title" 
            id="title" 
            variant="filled" 
            error={errors.username !== ''} 
            helperText={errors.username}
            required 
            onChange={(e) => {
            setTitle(e.target.value);
                  }}/>  
        <TextField 
            required 
            label="Description" 
            variant="filled" 
            onChange={(e) => {
                    setDescription(e.target.value);
                  }} 
            id="description" 
            multiline
            rows={8}
            name="description"/>
        <Select 
          variant="filled" 
          class="input" 
          id="label" 
          name="label" 
          required 
          onChange={(e) => {
                    setLabel(e.target.value);
                  }}>
              <MenuItem value="2nd-year">2nd-year</MenuItem>
              <MenuItem value="3rd-year">3rd-year</MenuItem>
              <MenuItem value="1st-year">1st-year</MenuItem>
              <MenuItem value="4th-year">4th-year</MenuItem>
          </Select> 
          <Button type="submit" onClick={makePost}>Create Post</Button>
      </div>

    </Box>




        </div>

    )
  }