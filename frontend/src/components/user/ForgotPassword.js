import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userActions';
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
import { useAlert } from 'react-alert';



const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { error, message, loading } = useSelector(state => state.forgotPasswordReducer)
    const alert=useAlert()
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        if (message) {
            alert.success(message)
        }
    }, [dispatch,message,error,alert])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email)
        dispatch(forgotPassword(formData))
    }
    return (
        <div>
            {/* <div className="row wrapper">
                <MetaData title="Forgot Password" />
                <ToastContainer
                        position="top-right"
                        autoClose={false}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover
                        theme="colored"
                    />
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading?true:false}>
                            Send Email
                        </button>

                    </form>
                </div>
            </div> */}
            <MetaData title={'Forgot password'} />
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
                                        label="Email"
                                        name="email"
                                        value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                    />
                                    

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Send Email
                                    </Button>
                                    

                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

        </div>
    )
}

export default ForgotPassword
