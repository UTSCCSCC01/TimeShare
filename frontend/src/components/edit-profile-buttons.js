import React from "react";
import { Button, Grid } from "@mui/material";

class EditProfileButtons extends React.Component {

    render() {

        console.log(this.props)
        return(
        <div style={{display: 'flex', justifyContent: 'space-between', ...this.props.sx}}>
            <Button sx={{width: "20%"}} onClick = {() => window.location.href='/updateProfile'} variant="contained">
                Update Profile
            </Button>
            <Button sx={{width: "20%"}} variant="contained">
                Create Timetable
            </Button>
            <Button sx={{width: "20%"}} variant="contained" onClick = {() => window.location.href="/group/create"}>
                Create Group
            </Button>
        </div>
    )}
}

export {
    EditProfileButtons
}