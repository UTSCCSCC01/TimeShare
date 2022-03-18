import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

class PostCard extends React.Component {

    render() {
        return (
        <Card key={this.props._id} sx={{ maxWidth: this.props.width }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height={this.props.height_img}
                image={this.props.post.image || "https://cdn.theatlantic.com/thumbor/pw4nRHmVwizV5kJBsUO5aiE39dU=/1500x1004/media/img/photo/2018/10/images-of-the-season-fall-is-in-the/f02_RTX6EJJJ/original.jpg"}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {this.props.post.post_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {this.props.post.description}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        )
    }
}

export {
    PostCard
}