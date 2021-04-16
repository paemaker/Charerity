import { BASKET_ADD_ITEM, BASKET_REM_ITEM } from "../Constants/AllConstants";

export const basketReducer = (state = { basketItems: [] }, action) => {
    switch(action.type) {
        case BASKET_ADD_ITEM:
            const item = action.payload;
            const existItem = state.basketItems.find(exist => exist.item === item.item);

            if(existItem) {
                return {
                    ...state,
                    basketItems: state.basketItems.map(exist => 
                        exist.item === existItem.item ? item : exist),
                };
            } else {
                return {
                    ...state, basketItems: [
                        ...state.basketItems, item
                    ]
                };
            };
        case BASKET_REM_ITEM:

            return {
                ...state,
                basketItems: state.basketItems.filter(exist => 
                    exist.item !== action.payload)
            };
        default:
            return state;
    }
};