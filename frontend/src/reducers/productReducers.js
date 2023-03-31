import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCESS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    GET_REVIEWS_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_SUCCESS,
    CLEAR_ERRORS
} from '../constsants/productConstants'

export const productReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
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
        case ADMIN_PRODUCTS_SUCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ADMIN_PRODUCTS_FAIL:
        case ALL_PRODUCTS_FAIL:
            return {
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


export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
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
            return {
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

export const newReviewReducers = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        default:
            return state;
    }
}

export const newProductReducers = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case NEW_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

export const productReviewReducers = (state = { reviews:[] }, action) => {
    switch (action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
        case GET_REVIEWS_FAIL:
            return {
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

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        
        case DELETE_REVIEW_FAIL:
        
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }
        
        default:
            return state;
    }
}

