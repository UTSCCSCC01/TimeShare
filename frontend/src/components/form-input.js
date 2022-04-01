import { TextField } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from "react";

class FormInput extends React.Component {
    render() {
        let a = this.props.opts ? this.props.opts.map(opt => <MenuItem key={opt.label} value={opt.value}>{opt.label}</MenuItem>) : ""
        let field
        if(this.props.type === "text"){
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
        else if(this.props.type === "select"){
            field = <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <TextField
                    style={{margin: "5%", width: "200px"}}
                    select
                    label={this.props.label}
                    name={this.props.name}
                    helperText={this.props.error}
                    error={this.props.error !== ""}
                    onChange={this.props.handleChange}
                    value={this.props.value}
                >
                    {a}
                </TextField>
            </div>
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