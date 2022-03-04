import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

class PostCard extends React.Component {

    render() {
        return (
        <Card sx={{ maxWidth: this.props.width }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height={this.props.height_img}
                image={this.props.post.image_url}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {this.props.post.title}
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