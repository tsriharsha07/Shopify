import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import { productReducers,productDetailsReducer } from './reducers/productReducers'
import { authReducer,userReducer,forgotPasswordReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer'


const reducer = combineReducers({
    products:productReducers,
    productDetails:productDetailsReducer,
    auth:authReducer,
    user:userReducer,
    forgotPasswordReducer:forgotPasswordReducer,
    cart:cartReducer
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