import { CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST,
    MY_ORDERS_REQUEST,
    MY_ORDERS_FAIL,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    CLEAR_ERRORS } from '../constsants/orderConstants';
import axios from 'axios';

export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/api/v1/order/new',order,config)
        console.log(data)
        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
        })    

    }
    catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data
        })
    }
}

export const myOrders=()=>async(dispatch)=>{
    try {
        dispatch({type:MY_ORDERS_REQUEST})
        const { data }=await axios.get('/api/v1/orders/me')
        console.log(data);
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.order
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const orderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`)
        
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/orders`)
        console.log(data)
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateOrder=(id,orderData)=>async(dispatch,getState)=>{
    try{
        dispatch({type:UPDATE_ORDER_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.put(`/api/v1/admin/order/${id}`,orderData,config)
        console.log(data)
        dispatch({
            type:UPDATE_ORDER_SUCCESS,
            payload:data.success
        })    

    }
    catch(error){
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:error.response.data
        })
    }
}

export const deleteOrder=(id)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_ORDER_REQUEST})
        
        const {data}=await axios.delete(`/api/v1/admin/order/${id}`)
        
        dispatch({
            type:DELETE_ORDER_SUCCESS,
            payload:data.success
        })    

    }
    catch(error){
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:error.response.data
        })
    }
}

export const clearErrors = async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
}


