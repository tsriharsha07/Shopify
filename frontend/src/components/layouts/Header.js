import React, { Fragment } from 'react'
import '../../App.css'
import Search from './Search'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Avatar, Badge } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Header = () => {
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    console.log(cartItems);

    const logoutHandler = () => {

        dispatch(logout())
    }
    const isAd=user&& user.role && user.role==='admin'
    //const avat=user && user.name && user.name.substring(0,1)
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
                    <Link to="/cart" style={{ textDecoration: "none" }}><Badge badgeContent={cartItems && cartItems.length} sx={{color:'orange'}} >
                        <ShoppingCartTwoToneIcon sx={{color:'orange'}}/>
                    </Badge>
                    </Link>
                    {user ? (
                        <div className='ml-4 dropdown d-inline'>
                            <Link to='#' className='btn dropdown-toggle text-white mr-4'
                                type='button' id='dropDownMenuButton' data-toggle="dropdown"
                                aria-haspopup='true' aria-expanded='false'>

                                <figure className="avatar avatar-nav">
                                    {/* <img src='/images/default_avatar.png' alt="avatar"
                                     className='rounded-circle'/> */}
                                    <Avatar sx={{ width: 35, height: 35, bgcolor:isAd?deepOrange[500]:deepPurple[500] }}
                                    >{user.name && user.name.substring(0,1)}</Avatar>
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>
                                {user && user.role !== 'admin' ? (

                                    <Link className="dropdown-item " to='/orders/me'><ShoppingBasketIcon sx={{marginRight:1}}/>Orders</Link>
                                ) : (
                                    <>
                                    <Link className="dropdown-item " to='/orders/me'><ShoppingBasketIcon sx={{marginRight:1}}/>Orders</Link>
                                    <Link className="dropdown-item " to='/dashboard'><DashboardIcon sx={{marginRight:1}}/>Dashboard</Link>
                                    </>
                                )}
                                <Link className="dropdown-item " to='/me'><AccountCircleIcon sx={{marginRight:1}}/>Profile</Link>

                                <Link className="dropdown-item text-danger" to='/' onClick={logoutHandler}>
                                    <LogoutIcon sx={{marginRight:1}}/>
                                    Logout
                                </Link>

                            </div>

                        </div>
                    ) : !loading && (
                        <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
                    )}


                </div>
            </nav>
        </Fragment>
    )
}

export default Header
