import React from "react"
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

class UnlimitedScrollBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overflow: "hidden"
        }
        this.handleHover = this.handleHover.bind(this);
        this.handleHoverLeave = this.handleHoverLeave.bind(this);
    };

    async handleHover () {
        this.setState({overflow: "auto"})
    }

    async handleHoverLeave () {
        this.setState({overflow: "hidden"})
    }

    render () {
        const items = this.props.objects.map((obj) => {
            return (
            <Card key={obj._id}>
                <CardActionArea>
            <Stack direction="row" sx={{height: 70, justifyContent: "flex-start", alignItems: "center"}}>
                <Avatar
                    src={obj.image}
                    sx={{ marginLeft: "2%", width: 50, height: 50, marginRight: "5%" }}
                />
                <p>
                    {obj.name}
                </p>
            </Stack>
            </CardActionArea>
            </Card>
            )
        })

        return(
            <Box sx={{...this.props.sx, overflowY: this.state.overflow}} onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverLeave}>
                <b>{this.props.title}</b>
                <hr/>
                <Stack spacing={2}>
                    {items}
                </Stack>
            </Box>
        )
    }
}

export {
    UnlimitedScrollBox
}