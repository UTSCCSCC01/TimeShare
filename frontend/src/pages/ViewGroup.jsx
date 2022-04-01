// import * as React from 'react';
import React, { useEffect, useState } from "react";
import Axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';



const theme = createTheme();

export const ViewGroup = (props) => {

    const [users, setUsers] = useState([]);
    const [group, setGroup] = useState({});
    const [loggedIn, setLoggedIn] = useState('')
    const { groupId } = useParams();
    let navigate = useNavigate();



    const goProfile = (username) => {
        navigate('/profile/' + username);
    }

    const joinGroup = () => {
        let user = localStorage.getItem('token')
        if (!user) {
            setLoggedIn('error')
            return;
        }
        else if(group.users.includes(localStorage.getItem('user-id'))) {
            setLoggedIn('already joined')
            return
        }
        else {
            setLoggedIn('')
        }

        Axios.post(`http://localhost:5000/api/group/join`,
            {
                group_id: groupId
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setLoggedIn('true')
                
            })
    }


    useEffect(() => {
        Axios.get(`http://localhost:5000/api/group/viewGroup/${groupId}`)
            .then((response) => {
                let data = response.data
                setGroup(data.group)
                setUsers(data.users)
            })
    }, [loggedIn])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {/* <CameraIcon sx={{ mr: 2 }} /> */}
                    <Typography variant="h6" color="inherit" noWrap>
                        TimeShare
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {group.name}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            {group.description}
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={joinGroup}>Join Group</Button>
                            <div>
                                {loggedIn == 'error' && <Alert severity="error">Must be logged in to join!</Alert>}
                                {loggedIn == 'true' && <Alert severity="success">Successfully joined the group!</Alert>}
                                {loggedIn == 'already joined' && <Alert severity="info"> You are already in this group!</Alert>}


                            </div>
                            {group.owner == localStorage.getItem('user-id') && <Button variant="contained" onClick={() => window.location.href = "/group/update/" + group.name } > Update Group</Button>}
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {users.map((user, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image={user.profile.avatar ? 'http://localhost:5000/' + user.profile.avatar : "https://www.refinitiv.com/perspectives/wp-content/uploads/2021/05/Saiem-Jalil.jpg"}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {user.username}
                                        </Typography>
                                        <Typography>
                                            {user.profile.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button style={{ width: '100%' }} onClick={() => {
                                            goProfile(user.username)
                                        }}>View</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    TimeShare
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Copyright 2022 &copy; TimeShare
                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}