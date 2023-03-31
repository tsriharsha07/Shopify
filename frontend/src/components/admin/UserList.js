import React,{useEffect} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layouts/Loader'
import { clearErrors,deleteUser,getAllUsers } from '../../actions/userActions'
import Sidebar from './Sidebar'
import { DELETE_USERS_RESET } from '../../constsants/userConstants'

const UserList = () => {
    const alert=useAlert()
    const dispatch=useDispatch();
    const {loading,error,users}=useSelector(state=>state.allUsers)
    const {isDeleted}=useSelector(state=>state.user)
    const navigate=useNavigate()
    
        useEffect(()=>{
        dispatch(getAllUsers())
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        if(isDeleted){
            alert.success('User Deleted Successfully')
            navigate('/admin/users')
            dispatch({type:DELETE_USERS_RESET})
        }
        
        
    },[dispatch,alert,error,navigate,isDeleted])
    const setUsers=()=>{
        const data={
            columns:[
                {
                    label:'User ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Email',
                    field:'email',
                    sort:'asc'
                },
                {
                    label:'Role',
                    field:'role',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    
                }
            ],
            rows:[]
        }
        users && users.length>0  &&users.forEach(user=>{
            data.rows.push({
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                actions:
                <>
                    <Link to={`/admin/user/${user._id}`} className='btn btn-primary py-1 px-2'>
                        <i className='fa fa-pencil'></i>
                    </Link>
                    
                    <button className='btn btn-danger py-1 px-2 ml-1' onClick={()=>deleteHandler(user._id)}>
                    <i className='fa fa-trash'></i>
                    </button>
                    </>
            })
        })
        return data;
    }

    const deleteHandler=(id)=>{
        dispatch(deleteUser(id))
    }
  return (
    <div>
      <div>
        <MetaData title={'All Orders'}/>
      <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            <>
                <h1 className='my-5'> All Users</h1>
                {loading?<Loader/>:(
                    <MDBDataTable
                    data={setUsers()}
                    className='px-3'
                    striped
                    bordered
                    hover
                    />
                )}
            </>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserList;
