import React from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";

class ProfileMetaText extends React.Component {
    render () {
        const name_str = `${this.props.first_name} ${this.props.last_name}`
        const desc_str = `${this.props.description}`
        const year_str = `${this.props.year}`
        const program_str = `${this.props.program}`

        return (
            <List>
                <ListItem>
                    <ListItemText
                    sx={{textAlign: "center"}}
                    primary={"Name"}
                    secondary={name_str}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    sx={{textAlign: "center"}}
                    primary={"Description"}
                    secondary={desc_str}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    sx={{textAlign: "center"}}
                    primary={"Year"}
                    secondary={year_str}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                    sx={{textAlign: "center"}}
                    primary={"Program"}
                    secondary={program_str}
                    />
                </ListItem>
            </List>
        )
    }
}

class ProfileMeta extends React.Component {
    render () {
        return(
            <Stack spacing={2} sx={this.props.sx}>
                <Box sx={{width: this.props.maxWidth, textAlign: "center"}}><b>{this.props.username}</b></Box>
                <Box sx={{
                    maxWidth: this.props.maxWidth,
                    maxHeight: 300,
                    textAlign: "center",
                }}>
                    <img style={{maxWidth: "inherit", objectFit: "contain", maxHeight: "inherit"}} src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"></img>
                </Box>
                <Box sx={{
                    maxWidth: this.props.maxWidth,
                    textAlign: "center",
                    justifyContent: "center"
                }}><ProfileMetaText first_name={this.props.first_name} 
                    last_name={this.props.last_name}
                    year={this.props.year}
                    program={this.props.program}
                    description={this.props.description}/>
                </Box>
                <Box sx={{
                    maxWidth: this.props.maxWidth,
                    textAlign: "center",
                }}>
                    <Button sx={{maxWidth: this.props.maxWidth / 2}} variant="contained">Update Profile</Button>
                </Box>
            </Stack>
        )
    }
}

export {
    ProfileMeta
}