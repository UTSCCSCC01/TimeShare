import React from "react";
import { BasicForm } from "../components/form";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from '../components/navbar';



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
            "http://localhost:5000/api/Group/", data, {
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
            Object.keys(errs).forEach(key => {
                errs[key] = response.errors[key] ? response.errors[key] : ""
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
                "description": "",
                "type": "",
                "image": "",
            },
            errors: {
                "image": "",
                "type": "",
                "description": "",
            },
            labels: {
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
            formError: "none",
            gid: ""

        }

        this.formTitle = "Update Group"
    };

    async componentDidMount () {
        const group_name = this.props.kwargs.groupName
        let resp = await axios.get(`http://localhost:5000/api/Group/${group_name}`, { 
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        let {description = "", type = "", _id, name} = resp.data
        let data = {...this.state.data, description, type}
        this.setState({data, loading: false, gid: _id, name})

    }

    postSubmitSucess(){
        window.location.href = `/viewGroup/${this.state.gid}`
    }
    async onSubmit(event) {
        let data = new FormData(event.target)
        data.set('name', this.state.name)
        let resp = await axios.put(
            "http://localhost:5000/api/Group/", data, {
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
            Object.keys(errs).forEach(key => {
                errs[key] = response.errors[key] ? response.errors[key] : ""
            })

            this.setState({errors: {name: "", description: "", type: "", image: "", ...errs}})
            return false;
        }
        else{
            return true;
        }
    }
}



export const UpdateGroup = () => {
    return (
        <div>
        <Navbar />
        <UpdateGroupForm
            kwargs={useParams()}/>
        </div>
    );
}


export const CreateGroup = () => {
    return (
        <div>
        <Navbar />
        <CreateGroupForm
        />
        </div>
        // <BasicForm data={data} errors={errors} labels={labels} inputtype={{phone: "number"}}/>
    );
}