import {
    ITEM_CREATE_REQUEST,
    ITEM_CREATE_SUCCESS,
    ITEM_CREATE_FAILURE,
    ITEM_DETAILS_FAILURE,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_LIST_FAILURE,
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_UPDATE_REQUEST,
    ITEM_UPDATE_SUCCESS,
    ITEM_UPDATE_FAILURE,
    ITEM_DELETE_REQUEST,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAILURE
} from '../Constants/AllConstants';
import axios from 'axios';

export const listItems = () => async (dispatch) => {
    dispatch({
        type: ITEM_LIST_REQUEST
    });

    try {
        const { data } = await axios.get('/api/items');
        dispatch({ 
            type: ITEM_LIST_SUCCESS, 
            payload: data 
        });
    } catch(error) {
        dispatch({ 
            type: ITEM_LIST_FAILURE, 
            payload: error.message 
        });
    }
};

export const detailItems = (itemId) => async (dispatch) => {
    dispatch({
        type: ITEM_DETAILS_REQUEST, 
        payload: itemId
    });

    try{
        const { data } = await axios.get(`/api/items/${itemId}`);
        dispatch({
            type: ITEM_DETAILS_SUCCESS, 
            payload: data 
        });
    } catch(error) {
        dispatch({ 
            type: ITEM_DETAILS_FAILURE, 
            payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message 
    });
    }
};

export const createItem = () => async (dispatch, getState) => {
    dispatch({ 
        type: ITEM_CREATE_REQUEST 
    });

    try {
        const { userLogin } = getState();
        const { data } = await axios.post('/api/items', {}, {
            headers: { 
                Authorization: `Bearer ${userLogin.userData.token}` },
        });
        dispatch({
            type: ITEM_CREATE_SUCCESS,
            payload: data.item,
        });
    } catch(error) {
        dispatch({ 
            type: ITEM_CREATE_FAILURE, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message
            : error.message
        });
    }
};

export const updateItem = (item) => async (dispatch, getState) => {
    dispatch({
        type: ITEM_UPDATE_REQUEST, 
        payload: item 
    });

    try {
        const { userLogin } = getState();
        const { data } = await axios.put(`/api/items/${item._id}`, item, {
            headers: { 
                Authorization: `Bearer ${userLogin.userData.token}` },
        });
        dispatch({ 
            type: ITEM_UPDATE_SUCCESS, 
            payload: data 
        });
    } catch(error) {
        dispatch({ 
            type: ITEM_UPDATE_FAILURE, 
            error: error.response && error.response.data.message ? 
            error.response.data.message
            : error.message
        });
    }
};

export const deleteItem = (itemId) => async (dispatch, getState) => {
    dispatch({
        type: ITEM_DELETE_REQUEST, 
        payload: itemId
    });

    try {
        const { userLogin } = getState();
        const { data } = await axios.delete(`/api/items/${itemId}`, {
            headers: { 
                Authorization: `Bearer ${userLogin.userData.token}` },
        });
        dispatch({ 
            type: ITEM_DELETE_SUCCESS, 
        });
    } catch(error) {
        dispatch({ 
            type: ITEM_DELETE_FAILURE, 
            error: error.response && error.response.data.message ? 
            error.response.data.message
            : error.message
        });
    }
};