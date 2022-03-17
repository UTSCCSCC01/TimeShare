import React, { useState } from 'react'
import Axios from 'axios';

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
            <form onSubmit={(e) => {
            e.preventDefault();
          }}
            >
 
                    <label for="title" required> Post Title </label>  
                    <input id="title" type="text" name="title" error={errors.username !== ''} helperText={errors.username}
                 required onChange={(e) => {
                    setTitle(e.target.value);
                  }}/>  
                  <br></br>
                  <hr></hr>

  
                    <label for="description" required> Description </label>  
                    <textarea required onChange={(e) => {
                    setDescription(e.target.value);
                  }} id="description" type="textarea" name="description"/>

                  <label for="label">Choose a label:</label>
                    <select id="label" name="label" required onChange={(e) => {
                    setLabel(e.target.value);
                  }}>
                    <option value="1st-year">1st-year</option>
                    <option value="2nd-year">2nd-year</option>
                    <option value="3rd-year">3rd-year</option>
                    <option value="4th-year">4th-year</option>
                    </select>  
                 <br></br>
                <button type="submit" onClick={makePost}>Create Post</button>  
  
            </form>  

        </div>

    )
  }