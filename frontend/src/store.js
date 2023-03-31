import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import { productReducers,productReducer,productDetailsReducer,newReviewReducers, newProductReducers, productReviewReducers, reviewReducer } from './reducers/productReducers'
import { authReducer,userReducer,forgotPasswordReducer,allUsersReducer, userDetailsReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer'
import { newOrderReducer,myOrdersReducer,orderDetailsReducer,allOrdersReducer,orderReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    products:productReducers,
    product:productReducer,
    productDetails:productDetailsReducer,
    newProduct:newProductReducers,
    auth:authReducer,
    user:userReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    forgotPasswordReducer:forgotPasswordReducer,
    cart:cartReducer,
    neworder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    newReview:newReviewReducers,
    productReviews:productReviewReducers,
    review:reviewReducer
})

let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shipping:localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')):{}
    }
}

const middleware = [thunk]
const store=createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store