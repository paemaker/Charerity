import axios from 'axios';
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    USER_UPDATE_REQUEST,
    USER_UPDATE_FAILURE,
    USER_UPDATE_SUCCESS,
} from '../Constants/AllConstants'

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST,
        payload: {
            email,
            password
        }
    });

    try{
        const { data } = await axios.post('/api/users/login', { email, password });

        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data
        });

        localStorage.setItem('userData', JSON.stringify(data));
    } catch(error) {
        dispatch({ 
            type: USER_LOGIN_FAILURE, 
            payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message 
    });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userData');
    localStorage.removeItem('basketItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ 
        type: USER_LOGOUT
    });
};

export const registerUser = (fullname, username, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {
            fullname,
            username,
            email,
            password
        }
    });

    try{
        const { data } = await axios.post('/api/users/register', { fullname, username, email, password });

        dispatch({
            type: USER_REGISTER_SUCCESS, 
            payload: data
        });
        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data
        });

        localStorage.setItem('userData', JSON.stringify(data));
    } catch(error) {
        dispatch({ 
            type: USER_REGISTER_FAILURE, 
            payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message 
    });
    }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({
        type: USER_DETAILS_REQUEST,
        payload: userId
    });

    try {
        const { userLogin } = getState();
        const { data } = await axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`
            }
        });

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({ 
            type: USER_DETAILS_FAILURE, 
            payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message 
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({
        type: USER_UPDATE_REQUEST,
        payload: user
    });

    try {
        const { userLogin } = getState();
        const { data } = await axios.put(`/api/users/profile`, user, {
            headers: {
                Authorization: `Bearer ${userLogin.userData.token}`
            } 
        });
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({ 
            type: USER_UPDATE_FAILURE, 
            payload: error.response && error.response.data.message ? 
                error.response.data.message : error.message 
        });
    }
};