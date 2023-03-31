import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',  
        password: ''
    })

    const { email, name, password } = user
    console.log(email);
    
    const dispatch = useDispatch()
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {

            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, navigate, error])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
       
        dispatch(register(formData))
    }
    const onChange=(e)=>{
            setUser({
              ...user,
                [e.target.name]: e.target.value
            })
        
    }
    return (
        <div>
            

<MetaData title={'Register'} />
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(https://source.unsplash.com/random)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Log in
                                </Typography>
                                <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
                                <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={onChange}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Register
                                    </Button>
                                    

                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
        </div>
    )
}

export default Register
