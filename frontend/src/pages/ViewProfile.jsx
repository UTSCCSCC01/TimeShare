import React from "react";
import { Grid } from "@mui/material";

import { Arrow } from "../components/arrow-component";
import { PostList } from "../components/post-show-list";
import { maxWidth } from "@mui/system";

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "first_name": "",
            "last_name": "",
            "program": "",
            "year_of_study": "",
            "phone": "", 
            "description": "",
            "avatar": "",
            "timetables": [],
            "public_groups": [],
            "private_groups": [],
            "posts": [],
            "private_viewable?": false,
            "start_posts": 0,
            "num_posts": 3,
        }

        if (this.props.isMe){
            this.state["private_viewable?"] = true
        }

        this.leftArrowClick = this.leftArrowClick.bind(this)
        this.rightArrowClick = this.rightArrowClick.bind(this)
        this.getViewablePosts = this.getViewablePosts.bind(this)
    };

    async leftArrowClick () {
        const old_start_posts = this.state["start_posts"]
        this.setState({"start_posts": old_start_posts - 1})
    }

    async rightArrowClick () {
        const old_start_posts = this.state["start_posts"]
        this.setState({"start_posts": old_start_posts + 1})
    }

    async componentDidMount () {
         let data = {} //backendstuff to get profile
        let new_data = {}
        let old_data = {}
        Object.keys(old_data).forEach(key => {
            new_data[key] = data[key] || old_data[key]
        })
        
        this.setState({ new_data })
    }

    getViewablePosts() {
        const posts = [
            {
                "key": "12343qasfa112",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            },
            {
                "key": "12343qasfa11223",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            },
            {
                "key": "12343qasfa112asdf",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            } 
        ]
        const start = this.state.start_posts
        const num_posts = this.state.num_posts

        return posts.slice(start, start + num_posts)
    }

    render () {
        let posts = this.getViewablePosts()

        return (
            <Grid container spacing={1} sx={{maxWidth: 1200}}
            align-items="center">
                <Grid item xs>
                    <Arrow direction="left" onClick={this.leftArrowClick}></Arrow>
                </Grid>
                <Grid item xs={11}>
                    <PostList posts={posts} width={1000}></PostList>
                </Grid>
                <Grid item xs>
                    <Arrow direction="right" onClick={this.rightArrowClick}></Arrow>
                </Grid>
            </Grid>
        );
    }
}



export const ProfileViewMe = () => {
    return (
        <ProfileView
            isMe={true}
        />
    );
}