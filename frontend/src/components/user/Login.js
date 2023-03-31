import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userActions';
import { useLocation, useNavigate,Link } from 'react-router-dom'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import 'react-toastify/dist/ReactToastify.css';
import { useAlert } from 'react-alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const alert = useAlert()
    const location = useLocation();
    const redirect = location.search ? `/${location.search.split('=')[1]}` : '/'
    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }
        if (error) {
            dispatch(clearErrors)
            alert.error(error)
        }

    }, [dispatch, redirect, isAuthenticated, navigate, error, alert])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <div >

            {loading ? <Loader /> :
                <>
                    <MetaData title={'Login'} />
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
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Log In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link to="/password/forgot" className='btn'>Forgot Password?</Link>
                                            </Grid>
                                        <Grid item>
                                            <Link to="/register" className='btn'>New User?</Link>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </>}
        </div>
    )
}

export default Login
