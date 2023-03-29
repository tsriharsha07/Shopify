import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import { productReducers,productReducer,productDetailsReducer,newReviewReducers, newProductReducers } from './reducers/productReducers'
import { authReducer,userReducer,forgotPasswordReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer'
import { newOrderReducer,myOrdersReducer,orderDetailsReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    products:productReducers,
    product:productReducer,
    productDetails:productDetailsReducer,
    newProduct:newProductReducers,
    auth:authReducer,
    user:userReducer,
    forgotPasswordReducer:forgotPasswordReducer,
    cart:cartReducer,
    order:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducers
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