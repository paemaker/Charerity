import {
    BASKET_ADD_ITEM,
    BASKET_ADD_ITEM_FAILURE,
    BASKET_REM_ITEM,
    BASKET_SAVE_ADDRESS,
    BASKET_SAVE_PAYMENT
} from '../Constants/AllConstants';

import axios from "axios";

export const addToBasket = (itemId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/items/${itemId}`);
    const { basket: { basketItems } } = getState();

    if(basketItems.length > 0 && data.giver._id !== basketItems[0].giver._id) {
        dispatch({
            type: BASKET_ADD_ITEM_FAILURE,
            payload: `ไม่สามารถรับบริจาคจากผู้ให้บริจาคมากกว่า 1 คนในรายการเดียวกันได้`,
        });
    } else {
        dispatch({
            type: BASKET_ADD_ITEM,
            payload: {
                title: data.title,
                image: data.image,
                description: data.description,
                item: data._id,
                writer: data.writer,
                category: data.category,
                giver: data.giver,
                quantity,
            }
        });
    }


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