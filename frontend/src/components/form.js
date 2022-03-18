import React from "react";
import { FormError } from "./form-error";
import { FormField } from "./form-field";

class BasicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            has_loaded: false,
            data: {},
            errors: {},
            labels: {},
            inputtype: {},
            formError: null
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    async onSubmit() {
        throw new Error('You have to implement the method onSubmit!');
    }

    postSubmitSucess(){
        this.setState({ loading: false, has_loaded: true })
    }

    postSubmitFailure(){
        this.setState({ loading: false, has_loaded: true })
    }

    async handleSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true, has_loaded: false })
        let success = await this.onSubmit(e)
        if(success){
            this.postSubmitSucess()
        }
        else{
            this.postSubmitFailure()
        }
    }

    handleFieldChange(event) {
        this.setState({data: {...this.state.data, [event.target.name]: event.target.value}});  
    }

    render() {
        const fields = Object.keys(this.state.data).map((dt, indexedDB) => 
            <FormField 
                key={dt}
                error={this.state.errors[dt]}
                label={this.state.labels[dt] || "label"}
                name={dt}
                type={this.state.inputtype[dt] || "text"}
                value={this.state.data[dt]}
                handleFieldChange={this.handleFieldChange}      
            />
        )

        if(this.state.loading){
            return <h1>Loading</h1>
        }
        else{
        return (
            <div className="form-container" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1>{this.formTitle}</h1>
            <form onSubmit={this.handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <FormError error={this.state.errors[this.state.formError] || ""}/>
                {fields}
                <button type="submit">Submit</button>
            </form>
            </div>
        )}
    }
}

export {
    BasicForm
}