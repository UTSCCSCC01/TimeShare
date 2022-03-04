import React from "react";
import { FormError } from "./form-error";
import { FormInput } from "../components/form-input";


class FormField extends React.Component {

    render() {
        return (
        <div className="form-field">
            <FormError error={this.props.error}/>
            <FormInput 
                label={this.props.label}
                name={this.props.name}
                value={this.props.value}
                type={this.props.type}
                handleChange={this.props.handleFieldChange} 
            />
        </div>
        )
    }
}

export {
    FormField
}