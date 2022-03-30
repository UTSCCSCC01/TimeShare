import React from "react";
import { BasicForm } from "../components/form";
import axios from "axios";
import { useParams } from "react-router-dom";


class CreateGroupForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            data: {
                "name": "",
                "description": "",
                "type": "",
                "image": "",
            },
            errors: {
                "name": "",
                "image": "",
                "type": "",
                "description": "",
            },
            labels: {
                "name": "Group Name",
                "image": "Group Avatar",
                "type": "Visibility",
                "description": "Group Description",
            },
            inputtype: {
                "image": "file",
                "type": "select"
            },
            selectOptions: {
                "type": [{
                    label: "Public",
                    value: "public"
                },
                {
                    label: "Private",
                    value: "private"
                }
                ]
            },
            formError: "none"

        }

        this.formTitle = "Create Group"
    };

    async componentDidMount () {
        this.setState({loading: false})

    }

    postSubmitSucess(){
        window.location.href = "/profile"
    }

    async onSubmit(event) {
        let data = new FormData(event.target)
        let resp = await axios.post(
            "http://localhost:5000/api/Groups/", data, {
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


class UpdateGroupForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            data: {
                "name": "",
                "description": "",
                "type": "",
                "image": "",
            },
            errors: {
                "name": "",
                "image": "",
                "type": "",
                "description": "",
            },
            labels: {
                "name": "Group Name",
                "image": "Group Avatar",
                "type": "Visibility",
                "description": "Group Description",
            },
            inputtype: {
                "image": "file",
                "type": "select"
            },
            selectOptions: {
                "type": [{
                    label: "Public",
                    value: "public"
                },
                {
                    label: "Private",
                    value: "private"
                }
                ]
            },
            formError: "none"

        }

        this.formTitle = "Update Group"
    };

    async componentDidMount () {
        const group_id = this.props.kwargs.group_id
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



export const UpdateGroup = () => {
    return (
        <UpdateGroupForm
            kwargs={useParams()}/>
        // <BasicForm data={data} errors={errors} labels={labels} inputtype={{phone: "number"}}/>
    );
}


export const CreateGroup = () => {
    return (
        <CreateGroupForm
        />
        // <BasicForm data={data} errors={errors} labels={labels} inputtype={{phone: "number"}}/>
    );
}