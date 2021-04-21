import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import {
    itemCreateReducer,
    itemDeleteReducer,
    itemDetailsReducer,
    itemListReducer,
    itemUpdateReducer
} from './Reducers/ItemReducer';
import {
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderDetailReducer,
    orderHistoryReducer,
    orderListReducer
} from './Reducers/OrderReducer';
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLogInReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from './Reducers/UserReducer';

import { basketReducer } from './Reducers/BasketReducer';
import thunk from 'redux-thunk';

const initialState = {
    basket: {
        basketItems: localStorage.getItem('basketItems') ?
            JSON.parse(localStorage.getItem('basketItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? 
            JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: 'ไม่เสียค่าใช้จ่าย',
    },
    userLogin: {
        userData: localStorage.getItem('userData') ?
            JSON.parse(localStorage.getItem('userData')) : null,
    },
};

const Reducer = combineReducers({ 
    itemList: itemListReducer, 
    itemDetails: itemDetailsReducer,
    itemCreate: itemCreateReducer,
    itemUpdate: itemUpdateReducer,
    itemDelete: itemDeleteReducer,
    userLogin: userLogInReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderList: orderListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderHistory: orderHistoryReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    basket: basketReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
    Reducer, initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default Store;