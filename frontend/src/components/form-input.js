import React from "react";

class FormInput extends React.Component {

    render() {
        return (
            <div className="form-input">
                <label>{this.props.label}</label>
                <input
                    type={this.props.type || "text"}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={this.props.handleChange}
                />
            </div>
        )
    }
}

export {
    FormInput
}