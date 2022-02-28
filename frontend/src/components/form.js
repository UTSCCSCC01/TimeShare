import React from "react";
import { FormError } from "./form-error";
import { FormField } from "./form-field";

class BasicForm extends React.Component {

    render() {
        const fields = Object.keys(this.props.data).map((dt, indexedDB) => 
            <FormField 
                key={dt}
                error={this.props.errors[dt]}
                label={this.props.labels[dt] || "label"}
                name={dt}
                type={this.props.inputtype[dt] || "text"}
                value={this.props.data[dt]}
                handleFieldChange={this.props.handleFieldChange}      
            />
        )

        return (
        <form onSubmit={this.props.handleSubmit}>
            <FormError error={this.props.errors[this.props.formError] || ""}/>
            {fields}
            <button type="submit">Submit</button>
        </form>
        )
    }
}

export {
    BasicForm
}