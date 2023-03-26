import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from '../constsants/productConstants'


export const getProducts = (keyword='',currentPage=1,price,category,rating)=>async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCTS_REQUEST})
        let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
        if(category){
            link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }
        
        const { data }=await axios.get(link)
        
        dispatch({
            type: ALL_PRODUCTS_SUCESS,
            payload: data
        })
    }
    catch(err){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: err.response
        })
    }
}

export const getProductDetails = (id) => async (dispatch)=>{
    try{
        dispatch({type:PRODUCTS_DETAILS_REQUEST})
        
        const { data }=await axios.get(`/api/v1/product/${id}`)
        
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        })
    }
    catch(err){
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: err.response
        })
    }
}



//Clear errors

export const clearErrors = async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
}

