import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { error, message, loading } = useSelector(state => state.forgotPasswordReducer)
    
    const notify = () => toast.error(message, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });



    useEffect(() => {
        if(error){
            dispatch(clearErrors)
        }
        if (message) {
            notify();
        }
    }, [dispatch,message,error])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email)
        dispatch(forgotPassword(formData))
    }
    return (
        <div className="container container-fluid">
            <div className="row wrapper">
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
            </div>
        </div>
    )
}

export default ForgotPassword
