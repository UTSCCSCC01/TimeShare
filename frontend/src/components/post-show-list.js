import React from "react";
import { PostCard } from "./post-show-list-item";
import { Grid } from "@mui/material";

class PostList extends React.Component {

    render() {
        const postCards = this.props.posts.map((post) => {
            return <PostCard key={post.key} item xs post={post} width={this.props.width / 4} height_img="140px"></PostCard>
        })

        return (
            <Grid alignItems="center" container justifyContent="space-evenly">
                {postCards}
            </Grid>
        )
    }
}

export {
    PostList
}