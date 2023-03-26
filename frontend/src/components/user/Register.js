import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

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
        <>
            <MetaData title={'Register User'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"

                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
