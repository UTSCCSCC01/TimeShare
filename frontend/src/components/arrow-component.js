import React from "react";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIos'

class Arrow extends React.Component {

    render() {
        let arrow = null

        if(this.props.direction === "left"){
            arrow = <ArrowBackIosNewIcon onClick={this.props.onClick}></ArrowBackIosNewIcon>
        }
        else if(this.props.direction === "right"){
            arrow = <ArrowForwardIosIcon onClick={this.props.onClick}></ArrowForwardIosIcon>
        }

        return (
            <div>
            {arrow}
            </div>
        )
    }
}

export {
    Arrow
}