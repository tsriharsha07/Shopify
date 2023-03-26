import React, { Fragment } from 'react'
import '../../App.css'
import Search from './Search'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../actions/userActions'


const Header = () => {
    const dispatch =useDispatch();

    const {user,loading} = useSelector(state=>state.auth)

    const logoutHandler = ()=>{
        
        dispatch(logout())
    } 

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to='/'><img src="/images/logo.png" alt="Logo" /></Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{textDecoration:"none"}}><span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">2</span></Link>
                    {user ? (
                         <div className='ml-4 dropdown d-inline'>
                            <Link to='#' className='btn dropdown-toggle text-white' 
                            type='button' id='dropDownMenuButton' data-toggle="dropdown"
                            aria-haspopup='true' aria-expanded='false'>
                                <figure className="avatar avatar-nav">
                                    <img src='/images/default_avatar.png' alt="avatar"
                                     className='rounded-circle'/>
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>
                                {user && user.role!=='admin' ?(
                                    
                                    <Link className="dropdown-item " to='/orders/me'>Orders</Link>
                                ):(
                                    <Link className="dropdown-item " to='/dashboard'>Dashboard</Link>
                                ) }
                                <Link className="dropdown-item " to='/me'>Profile</Link>
                                
                                <Link className="dropdown-item text-danger" to='/' onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>

                        </div>
                    ): !loading && (
                        <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
                    )}
                    
                    
                </div>
            </nav>
        </Fragment>
    )
}

export default Header