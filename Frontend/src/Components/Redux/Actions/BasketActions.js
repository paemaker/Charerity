import { BASKET_ADD_ITEM, BASKET_REM_ITEM } from '../Constants/AllConstants';

import axios from "axios";

export const addToBasket = (itemId) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/items/${itemId}`);

    dispatch({
        type: BASKET_ADD_ITEM,
        payload: {
            title: data.title,
            src: data.src,
            price: data.price,
            count: data.count,
            item: data._id,
            owner: data.owner
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
}