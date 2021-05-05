import {
    BASKET_ADD_ITEM,
    BASKET_ADD_ITEM_FAILURE,
    BASKET_EMPTY,
    BASKET_REM_ITEM,
    BASKET_SAVE_ADDRESS,
    BASKET_SAVE_PAYMENT
} from "../Constants/AllConstants";

export const basketReducer = (state = { basketItems: [] }, action) => {
    switch(action.type) {
        case BASKET_ADD_ITEM:
            const item = action.payload;
            const existItem = state.basketItems.find(exist => exist.item === item.item);

            if(existItem) {
                return {
                    ...state,
                    error: '',
                    basketItems: state.basketItems.map(exist => 
                        exist.item === existItem.item ? item : exist),
                };
            } else {
                return {
                    ...state,
                    error: '',
                    basketItems: [
                        ...state.basketItems, item
                    ]
                };
            };
        case BASKET_REM_ITEM:
            return {
                ...state,
                error: '',
                basketItems: state.basketItems.filter(exist => 
                    exist.item !== action.payload)
            };
        case BASKET_SAVE_ADDRESS: 
            return {
                ...state,
                shippingAddress: action.payload
            };
        case BASKET_SAVE_PAYMENT:
            return {
                ...state,
                paymentMethod: action.payload
            };
        case BASKET_ADD_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case BASKET_EMPTY:
            return {
                ...state,
                error: '',
                basketItems: [],
            };
        default:
            return state;
    }
};