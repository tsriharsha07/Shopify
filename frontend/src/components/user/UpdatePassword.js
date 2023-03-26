import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PASSWORD_RESET } from '../../constsants/userConstants';



const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { user, } = useSelector(state => state.auth)
    const { isUpdated, error, loading } = useSelector(state => state.user)
    const navigate = useNavigate()
    const notify = () => toast.error('Passowrd Update Success', {
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
        if (error) {

            dispatch(clearErrors)
        }
        if (isUpdated) {
            notify();
            dispatch(loadUser)
            navigate('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, isUpdated, navigate, error])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)


        dispatch(updatePassword(formData))
    }
    return (
        <>
            <MetaData title="Update Password" />
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
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                        disabled={loading?true:false}>Update Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword
