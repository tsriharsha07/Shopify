import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constsants/productConstants'

export const productReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case ALL_PRODUCTS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const productDetailsReducer=(state = { product : {} },action)=>{
    switch(action.type){
        case PRODUCTS_DETAILS_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case PRODUCTS_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCTS_DETAILS_FAIL:
            return{
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
               ...state,
                error: null
            }
        default:
            return state;
    }
}