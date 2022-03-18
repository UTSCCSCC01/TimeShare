import { TextField } from "@mui/material";
import React from "react";

class FormInput extends React.Component {

    render() {
        let field
        if(this.props.type !== "file"){
            field = <TextField
                style={{margin: '5%'}}
                error={this.props.error !== ""}
                helperText={this.props.error}
                label={this.props.label}
                type={this.props.type || "text"}
                value={this.props.value}
                onChange={this.props.handleChange}
                name={this.props.name}>
            </TextField>
        }
        else{
            field = <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h3>{this.props.label}</h3>
                <TextField
                    style={{margin: '5%'}}
                    error={this.props.error !== ""}
                    helperText={this.props.error}
                    type={this.props.type || "text"}
                    name={this.props.name}>
                </TextField>
            </div>
        }
        return (
            <>{field}</>
        )
    }
}

export {
    FormInput
}