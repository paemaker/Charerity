import {
    BASKET_EMPTY,
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAILURE,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELIVER_FAILURE,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_HISTORY_LIST_FAILURE,
    ORDER_HISTORY_LIST_REQUEST,
    ORDER_HISTORY_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS
} from '../Constants/AllConstants';

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ 
        type: ORDER_CREATE_REQUEST,
        payload: order
    });

    try {
        const { userLogin } = getState();
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`,
            } 
        });
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order,
        });
        dispatch({
            type: BASKET_EMPTY,
        });
        localStorage.removeItem('basketItems');
    } catch(error) {
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message,
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DETAILS_REQUEST,
        palyload: orderId,
    });
    
    try {
        const { userLogin } = getState();
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`,
            }
        });
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message,
        });
    }
};

export const listOrderHistory = () => async (dispatch, getState) => {
    dispatch({
        type: ORDER_HISTORY_LIST_REQUEST
    });
    
    try {
        const { userLogin } = getState();
        const { data } = await axios.get('/api/orders/history', {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`,
            }
        });
        dispatch({
            type: ORDER_HISTORY_LIST_SUCCESS,
            payload: data,
        });
    } catch(error) {
        dispatch({
            type: ORDER_HISTORY_LIST_FAILURE,
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message,
        });
    }
};

export const listOrders = ({ giver = '' }) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_LIST_REQUEST
    });
    
    try {
        const { userLogin } = getState();
        const { data } = await axios.get(`/api/orders?giver=${giver}`, {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`,
            }
        });
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch(error) {
        dispatch({
            type: ORDER_LIST_FAILURE,
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message,
        });
    }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DELETE_REQUEST,
        payload: orderId,
    });
    
    try {
        const { userLogin } = getState();
        const { data } = await axios.delete(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`,
            }
        });
        console.log(data);
        dispatch({
            type: ORDER_DELETE_SUCCESS,
            payload: data,
        });
    } catch(error) {
        dispatch({
            type: ORDER_DELETE_FAILURE,
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message,
        });
    }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DELIVER_REQUEST,
        payload: orderId,
    });
    
    try {
        const { userLogin } = getState();
        const { data } = await axios.put(`/api/orders/${orderId}/deliver`, {}, {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`,
            }
        });

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch(error) {
        dispatch({
            type: ORDER_DELIVER_FAILURE,
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message,
        });
    }
};