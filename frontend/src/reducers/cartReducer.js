import {ADD_TO_CART} from '../constsants/cartConstants'


export const cartReducer=(state={cartItems:[]},action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;
            console.log(typeof(state.cartItems))
            const isItemExist = state.cartItems.find(i => i.product === item.product)
            
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === item.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state
    }
    
}