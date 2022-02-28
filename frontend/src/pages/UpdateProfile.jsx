import React from "react";
import { BasicForm } from "../components/form";

class UpdateProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            has_loaded: false,
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
            }

        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    async onSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true, has_loaded: false })
        let body = {pid: this.props.pid, ...this.state.data}
        console.log(body)
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
            let errors = await resp.json()
            this.setState({errors})
            
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
        this.setState({ loading: false, has_loaded: true })
    }

    handleFieldChange(event) {
        this.setState({data: {...this.state.data, [event.target.name]: event.target.value}});  
    }

    render () {
        if(this.state.loading){
            return <div>Loading</div>
        }
        else{
        return (
            <BasicForm 
                data={this.state.data}
                errors={this.state.errors}
                inputtype={this.state.inputtype}
                labels={this.state.labels}
                handleFieldChange={this.handleFieldChange}
                handleSubmit={this.onSubmit}
                formError={"profile"}
            />
        )}
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