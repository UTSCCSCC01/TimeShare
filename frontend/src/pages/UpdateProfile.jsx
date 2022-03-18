import React from "react";
import { BasicForm } from "../components/form";
import axios from "axios";


class UpdateProfileForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            data: {
                "first_name": "",
                "last_name": "",
                "program": "",
                "year_of_study": "",
                "phone": "", 
                "description": "",
                "avatar": "",
            },
            errors: {
                "first_name": "",
                "last_name": "",
                "program": "",
                "year_of_study": "",
                "phone": "", 
                "description": "",
                "avatar": ""
            },
            labels: {
                "first_name": "First Name",
                "last_name": "Last Name",
                "program": "Program",
                "year_of_study": "Year of study",
                "phone": "Phone",
                "description": "Description",
                "avatar": "Avatar"
            },
            inputtype: {
                "year_of_study": "number",
                "avatar": "file"
            },
            formError: "profile"

        }

        this.formTitle = "Update Profile"
    };

    async componentDidMount () {
        let resp = await axios.get(`http://localhost:5000/api/Profiles/`, { 
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        let {first_name = "", last_name = "", program = "", year_of_study = "", phone = "", description = "" } = resp.data
        let data = {...this.state.data, first_name, last_name, program, year_of_study, phone, description}
        this.setState({data, loading: false})

    }

    postSubmitSucess(){
        window.location.href = "/profile"
    }
    async onSubmit(event) {
        let data = new FormData(event.target)
        let resp = await axios.put(
            "http://localhost:5000/api/Profiles/", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).catch((e) => {
            return e.response
        })

        if(resp.status >= 400){
            let response = await resp.data
            let errors = response.errors
            let errs = this.state.errors
            Object.keys(errors).forEach(key => {
                errs[key] = response.errors[key]
            })

            this.setState({errors: errs})
            return false;
        }
        else{
            return true;
        }
    }
}



export const UpdateProfile = () => {
    return (
        <UpdateProfileForm
            pid="621b22ee0180781ea2f20948"
        />
        // <BasicForm data={data} errors={errors} labels={labels} inputtype={{phone: "number"}}/>
    );
}