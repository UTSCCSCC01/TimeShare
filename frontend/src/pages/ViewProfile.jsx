import React from "react";
import { Box, Grid, Paper, Button } from "@mui/material";
import { Arrow } from "../components/arrow-component";
import { PostList } from "../components/post-show-list";
import { ProfileMeta } from "../components/profile-meta";
import { UnlimitedScrollBox } from "../components/unlimited-scrollable";
import axios from "axios";
import { useParams } from "react-router-dom"
import "../css/ProfileView.css"
import { EditProfileButtons } from "../components/edit-profile-buttons"

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
            "start_posts": 0,
            "num_posts": 3,
            "username": "",
            "loading": true,
            "unauthorized": false,
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
        let response
        if(this.props.private !== true){
            const username = this.props.kwargs.username
            response = await axios.get(`http://localhost:5000/api/Profiles/${username}`,{ 
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        }
        else{
            response = await axios.get(`http://localhost:5000/api/Profiles/`,{ 
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        }
        let data = response.data
        console.log(data)
        if(data.Error === "User is not authorized"){
            this.setState({loading: false, unauthorized: true})
            return
        }

        if(data.year_of_study === null){
            data['year_of_study'] = "Not set"
        }

        if(!data.program || data.program === ""){
            data['program'] = "Not set"
        }

        if(data.first_name === "" && data.last_name === ""){
            data.first_name = "No Name"
        }

        if(!data.description || data.description === ""){
            data.description = "Not set"
        }

        if(!data.avatar || data.avatar === ""){
            data.avatar = "https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png"
        }
        else{
            data.avatar = "http://localhost:5000/" + data.avatar
        }
        this.setState({ ...data, loading: false })
    }

    getViewablePosts() {
        const posts = this.state.posts
        const start = this.state.start_posts
        const num_posts = this.state.num_posts

        return posts.slice(start, start + num_posts)
    }

    render () {

        if(this.state.loading){
            return <h1>Loading</h1>
        }

        if(this.state.unauthorized){
            return <div className="redirect-container"><h1>Log in to check your profile</h1><a href="/login">Let me redirect you!</a></div>
        }
        let posts = this.getViewablePosts()

        let postView =
        <>
            <Grid item xs>
                {this.state.posts.length !== 0 && this.state.start_posts > 0 && <Arrow direction="left" onClick={this.leftArrowClick}></Arrow>}
            </Grid>
            <Grid item xs={11}>
                {this.state.posts.length > 0 && <PostList posts={posts} width={1000}></PostList>}
                {this.state.posts.length === 0 && <h1 width={1000} textalign='center'>No Posts</h1>}
            </Grid>
            <Grid item xs>
            {this.state.posts.length > 0 && this.state.start_posts + this.state.num_posts < this.state.posts.length &&
                <Arrow direction="right" onClick={this.rightArrowClick}></Arrow>
            }
            </Grid>
        </>

        let privateGroups
        if(this.props.private){
            privateGroups = <UnlimitedScrollBox
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
        else{
            privateGroups = <Box
            sx={{gridColumnStart: 3,
                gridColumnEnd: 4,
                gridRowEnd: 3,
                gridRowStart: 2,
                maxHeight: "30vh",
                width: "20vw",
                marginLeft: "5vw"
            }}
            ><h1>Cannot view private groups</h1></Box>
        }

        let profileEdits
        if(this.props.private){
            profileEdits = <EditProfileButtons sx={{
                gridRowStart: 5,
                gridRowEnd: 5,
                gridColumnStart: 1,
                gridColumnEnd: 5
            }}></EditProfileButtons>
        }

        return (
            <div className="profile-view-container">
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
                    username={this.state.username}
                    avatar={this.state.avatar}/>

                <Grid container spacing={1} sx={{maxWidth: 1200,
                    gridColumnStart: 2,
                    gridColumnEnd: 5,
                    gridRowEnd: 1,
                    gridRowStart: 1,
                    marginBottom: "5%"}}
                align-items="center">
                    {postView}
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
                {privateGroups}
                {profileEdits}
            </div>
        );
    }
}

class PrivateProfileView extends React.Component {
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
            "posts": [],
            "start_posts": 0,
            "num_posts": 3,
            "username": "",
            "loading": true,
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
        let response = await axios.get(`http://localhost:5000/api/Profiles/`,{ 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        let data = response.data

        if(data.year_of_study === null){
            data['year_of_study'] = "Not set"
        }

        if(data.program === ""){
            data['program'] = "Not set"
        }

        if(data.first_name === "" && data.last_name === ""){
            data.first_name = "No Name"
        }

        if(data.description === ""){
            data.description = "Not set"
        }

        data.avatar = "http://localhost:5000/" + data.avatar
        this.setState({ ...data })
    }

    getViewablePosts() {
        const posts = this.state.posts
        const start = this.state.start_posts
        const num_posts = this.state.num_posts

        return posts.slice(start, start + num_posts)
    }

    render () {
        console.log(this.state)
        let posts = this.getViewablePosts()

        let postView = <>
            <Grid item xs>
                {this.state.posts.length && this.state.start_posts > 0 && <Arrow direction="left" onClick={this.leftArrowClick}></Arrow>}
            </Grid>
            <Grid item xs={11}>
                {this.state.posts.length > 0 && <PostList posts={posts} width={1000}></PostList>}
                {this.state.posts.length === 0 && <h1 width={1000} textAlign='center'>No Posts</h1>}
            </Grid>
            <Grid item xs>
            {this.state.posts.length > 0 && this.state.start_posts + this.state.num_posts < this.state.posts.length &&
                <Arrow direction="right" onClick={this.rightArrowClick}></Arrow>
            }
            </Grid>
            </>
        return (
            <div className="profile-view-container">
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
                    username={this.state.username}
                    avatar={this.state.avatar}/>

                <Grid container spacing={1} sx={{maxWidth: 1200,
                    gridColumnStart: 2,
                    gridColumnEnd: 5,
                    gridRowEnd: 1,
                    gridRowStart: 1,
                    marginBottom: "5%"}}
                align-items="center">
                    {postView}
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
            </div>
        );
    }
}

export const PubProfileView = () => {
        return (
            <ProfileView
            kwargs={useParams()}/>
        )}
export const PrivProfileView = () => {
        return (
            <ProfileView
            private={true}/>
        )
    }