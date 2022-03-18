import React from "react";
import { FormInput } from "../components/form-input";


class FormField extends React.Component {

    render() {
        return (
        <div className="form-field">
            <FormInput
                error={this.props.error} 
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