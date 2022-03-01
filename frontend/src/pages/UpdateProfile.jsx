import React from "react";
import { BasicForm } from "../components/form";

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
            },
            errors: {
                "first_name": "",
                "last_name": "",
                "program": "",
                "year_of_study": "",
                "phone": "", 
                "description": "",
            },
            labels: {
                "first_name": "First Name",
                "last_name": "Last Name",
                "program": "Program",
                "year_of_study": "Year of study",
                "phone": "Phone",
                "description": "Description"
            },
            inputtype: {
                "year_of_study": "number"
            },
            formError: "profile"

        }
    };

    async componentDidMount () {
        let data = await (await fetch(`http://localhost:5000/api/Profiles/?pid=${this.props.pid}`)).json()
        let new_data = {}
        console.log(this.state)
        Object.keys(this.state.data).forEach(key => {
            new_data[key] = data[key] || this.state.data[key]
        })
        
        this.setState({ data: new_data })
        this.setState({ loading: false })
    }

    async onSubmit() {
        let body = {pid: this.props.pid, ...this.state.data}
        let resp = await fetch(
            "http://localhost:5000/api/Profiles/",{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        if(resp.status >= 400){
            let response = await resp.json()
            let errors = response.errors
            let errs = this.state.errors
            console.log(errors)
            Object.keys(errors).forEach(key => {
                errs[key] = response.errors[key]
            })

            this.setState({errors: errs})
            
        }
        else{
            this.setState({errors: {
                "first_name": "",
                "last_name": "",
                "program": "",
                "year_of_study": "",
                "phone": "", 
                "description": "",
            }})
            // redirect, nothing for now
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