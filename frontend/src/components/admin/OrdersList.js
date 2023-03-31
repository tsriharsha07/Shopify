import React,{useEffect} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layouts/Loader'
import { clearErrors,allOrders,deleteOrder } from '../../actions/orderActions'
import Sidebar from './Sidebar'
import { DELETE_ORDER_RESET } from '../../constsants/orderConstants'


const OrdersList = () => {
    const alert=useAlert()
    const dispatch=useDispatch();
    const {loading,error,orders}=useSelector(state=>state.allOrders)
    const {isDeleted}=useSelector(state=>state.order)
    const navigate=useNavigate()
    
        useEffect(()=>{
        dispatch(allOrders())
        console.log("useeffect");
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        
        if(isDeleted){
            alert.success('Order Deleted Successfully')
            navigate('/admin/orders')
            dispatch({type:DELETE_ORDER_RESET})
        }
    },[dispatch,alert,error,isDeleted,navigate])
    const setOrders=()=>{
        const data={
            columns:[
                {
                    label:'Order ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Num of items',
                    field:'numOfItems',
                    sort:'asc'
                },
                {
                    label:'Amount',
                    field:'amount',
                    sort:'asc'
                },
                {
                    label:'Status',
                    field:'status',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    
                }
            ],
            rows:[]
        }
        orders.length>0  &&orders.forEach(order=>{
            data.rows.push({
                id:order._id,
                numOfItems:order.orderItems.length,
                amount:`$${order.totalPrice}`,
                status:order.orderStatus && String(order.orderStatus).includes('Delivered') ? 
                <p style={{color:'green'}}>{order.orderStatus}</p> 
                :<p style={{color:'red'}}>{order.orderStatus}</p>,
                actions:
                <>
                    <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-2'>
                        <i className='fa fa-eye'></i>
                    </Link>
                    
                    <button className='btn btn-danger py-1 px-2 ml-1' onClick={()=>{deleteHandler(order._id)}}>
                    <i className='fa fa-trash'></i>
                    </button>
                    </>
            })
        })
        return data;
    }
    const deleteHandler=(id)=>{ 
        dispatch(deleteOrder(id))
    }
  return (
    <div>
        <MetaData title={'All Orders'}/>
      <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            <>
                <h1 className='my-5'> All Orders</h1>
                {loading?<Loader/>:(
                    <MDBDataTable
                    data={setOrders()}
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
  )
}

export default OrdersList
