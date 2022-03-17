import React, { useState } from 'react'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Paper } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

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
                    <TextField
                        style={{ width: 300 }}
                        label="Post Title"
                        id="title"
                        variant="filled"
                        error={errors.username !== ''}
                        helperText={errors.username}
                        required
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }} />
                </div><div class="marg">
                    <TextField
                        style={{ width: 300 }}
                        required
                        label="Description"
                        variant="filled"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        id="description"
                        multiline
                        rows={8}
                        name="description" />
                </div><div class="marg">

                    <FormControl 
                    ccontainer justifyContent="center">
                        
                    <InputLabel id="demo-simple-select-standard-label">Label</InputLabel>
        
                        <Select
                            label={"Label"}
                            value={label}
                            variant="filled"
                            style={{ width: 300 }}
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
                        </Select>
                    </FormControl>
                
                </div><div>

                    <Button
                        type="submit"
                        onClick={makePost}
                        variant="contained"> Post
                    </Button>
                </div>

            </Box>

        </div>

    )
}