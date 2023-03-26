import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProfile, loadUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PROFILE_RESET } from '../../constsants/userConstants';



const UpdateProfile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const dispatch = useDispatch()
    const { user, } = useSelector(state => state.auth)
    const { isUpdated, error, loading } = useSelector(state => state.user)
    const navigate = useNavigate()
    const notify = () => toast.error('Update Success', {
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
        if (user) {
            setName(user.name)
            setEmail(user.email)

            
        }
        if (error) {

            dispatch(clearErrors)
        }
        if (isUpdated) {
            notify();
            dispatch(loadUser)
            navigate('/me')
            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, user,isUpdated, navigate, error])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)


        dispatch(updateProfile(formData))
    }
    
    return (
        <div>
            <div className="row wrapper">
                    <MetaData title={'Update Profile'}/>
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
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile
