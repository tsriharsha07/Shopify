import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {  Navigate } from 'react-router-dom'
import { loadUser } from '../../actions/userActions'
import Loader from '../layouts/Loader'

const ProtectedRoute = ({isAdmin,children}) => {
    const {isAuthenticated=false,loading=true,user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!user){
            dispatch(loadUser())
        }
    },[dispatch,user])
    if(loading){
        return <Loader/>
    }
    if(!loading && isAuthenticated){
        if(isAdmin===true && user.role!=='admin'){ 
            return <Navigate to='/'/>
        }
        return children;
    }
    else{
        return <Navigate to='/login' />
    }
    
    
}

export default ProtectedRoute
