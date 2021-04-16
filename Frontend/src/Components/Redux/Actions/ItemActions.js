import {
    ITEM_DETAILS_FAILURE,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_LIST_FAILURE,
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS
} from '../Constants/AllConstants';

import axios from 'axios';

export const listItems = () => async (dispatch) => {
    dispatch({
        type: ITEM_LIST_REQUEST
    });

    try {
        const { data } = await axios.get('/api/items');
        dispatch({ 
            type: ITEM_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({ 
            type: ITEM_LIST_FAILURE, payload: error.message 
        });
    }
};

export const detailItems = (itemId) => async (dispatch) => {
    dispatch({
        type: ITEM_DETAILS_REQUEST, payload: itemId
    });

    try{
        const { data } = await axios.get(`/api/items/${itemId}`);
        dispatch({
            type: ITEM_DETAILS_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({ 
            type: ITEM_DETAILS_FAILURE, 
            payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message 
    });
    }
};