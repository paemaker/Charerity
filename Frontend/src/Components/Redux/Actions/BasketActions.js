import { 
    BASKET_ADD_ITEM,
    BASKET_REM_ITEM,
    BASKET_SAVE_ADDRESS,
    BASKET_SAVE_PAYMENT
} from '../Constants/AllConstants';

import axios from "axios";

export const addToBasket = (itemId) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/items/${itemId}`);

    dispatch({
        type: BASKET_ADD_ITEM,
        payload: {
            title: data.title,
            image: data.image,
            quantity: data.quantity,
            item: data._id,
            writer: data.writer,
            category: data.category,
        }
    });

    localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
};

export const removeFromBasket = (itemId) => (dispatch, getState) => {
    dispatch({
        type: BASKET_REM_ITEM,
        payload: itemId
    });

    localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: BASKET_SAVE_ADDRESS,
        payload: data
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: BASKET_SAVE_PAYMENT,
        payload: data
    });
};