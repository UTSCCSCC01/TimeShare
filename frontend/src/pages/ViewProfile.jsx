import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Arrow } from "../components/arrow-component";
import { PostList } from "../components/post-show-list";
import { ProfileMeta } from "../components/profile-meta";
import { UnlimitedScrollBox } from "../components/unlimited-scrollable";

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "first_name": "bobby",
            "last_name": "green",
            "program": "cs",
            "year_of_study": "5",
            "phone": "", 
            "description": "Hi, I'm bobby. You will often see me about because i'm an active utm student trying to do my best for the environment!",
            "avatar": "",
            "timetables": [],
            "public_groups": [],
            "private_groups": [],
            "posts": [],
            "private_viewable?": false,
            "start_posts": 0,
            "num_posts": 3,
            "username": "basic_username",
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
        let private_groups = [
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Private group 1"
            },
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Private group 2"
            }
        ]

        let public_groups = [
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Public group 1"
            },
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Public group 2"
            },
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Public group 3"
            },
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Public group 4"
            },
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Public group 5"
            },
            {
                "image": "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8&w=1000&q=80",
                "name": "Public group 6"
            }
        ]
        const posts = [
            {
                "key": "12343qasf12",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable 1!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            },
            {
                "key": "123asfa112",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable 2!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            },
            {
                "key": "12343qasfa112",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable 3!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            },
            {
                "key": "12343qasfa11223",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable 4!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            },
            {
                "key": "12343qasfa112asdf",
                "image_url": "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/05/projectschedulemanagement.jpg",
                "title": "My awesome timetable 5!",
                "description": "Hi guys, as a cool guy from UTM, I'd love to share my timetable! LMK what you think!"
            } 
        ]
        let data = {posts, public_groups, private_groups} // usually do backend stuff
        // let new_data = {}
        // let old_data = this.state
        // Object.keys(old_data).forEach(key => {
        //     new_data[key] = data[key] || old_data[key]
        // })
        this.setState({ posts, public_groups, private_groups })
    }

    getViewablePosts() {
        const posts = this.state.posts
        const start = this.state.start_posts
        const num_posts = this.state.num_posts

        return posts.slice(start, start + num_posts)
    }

    render () {
        let posts = this.getViewablePosts()

        return (
            <div class="profile-view-container">
                <ProfileMeta
                    sx={{gridColumnStart: 1,
                        gridColumnEnd: 1,
                        gridRowEnd: 4,
                        gridRowStart: 1}}
                    maxWidth={300}
                    first_name={this.state.first_name} 
                    last_name={this.state.last_name}
                    year={this.state.year_of_study}
                    program={this.state.program}
                    description={this.state.description}
                    username={this.state.username}/>

                <Grid container spacing={1} sx={{maxWidth: 1200,
                    gridColumnStart: 2,
                    gridColumnEnd: 5,
                    gridRowEnd: 1,
                    gridRowStart: 1,
                    marginBottom: "5%"}}
                align-items="center">
                    <Grid item xs>
                    {this.state.start_posts > 0 && <Arrow direction="left" onClick={this.leftArrowClick}></Arrow>}
                    </Grid>
                    <Grid item xs={11}>
                        <PostList posts={posts} width={1000}></PostList>
                    </Grid>
                    <Grid item xs>
                    {this.state.start_posts + this.state.num_posts < this.state.posts.length &&
                        <Arrow direction="right" onClick={this.rightArrowClick}></Arrow>
                    }
                    </Grid>
                </Grid>
                
                <UnlimitedScrollBox
                sx={{gridColumnStart: 2,
                    gridColumnEnd: 3,
                    gridRowEnd: 3,
                    gridRowStart: 2,
                    maxHeight: "30vh",
                    width: "20vw",
                    marginLeft: "5vw"}}
                objects={this.state.public_groups}
                title="Public Groups"
                ></UnlimitedScrollBox>
                {this.props.isMe && 
                    <UnlimitedScrollBox
                    sx={{gridColumnStart: 3,
                        gridColumnEnd: 4,
                        gridRowEnd: 3,
                        gridRowStart: 2,
                        maxHeight: "30vh",
                        width: "20vw",
                        marginLeft: "5vw"
                    }}
                    objects={this.state.private_groups}
                    title="Private Groups"
                    ></UnlimitedScrollBox>
                }
            </div>
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