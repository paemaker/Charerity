import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { itemDetailsReducer, itemListReducer } from './Reducers/ItemListReducer';

import { basketReducer } from './Reducers/BasketReducer';
import thunk from 'redux-thunk';

const initialState = {
    basket: {
        basketItems: localStorage.getItem('basketItems') ?
            JSON.parse(localStorage.getItem('basketItems')) : [],
    },
};

const Reducer = combineReducers({ 
    itemList: itemListReducer, 
    itemDetail: itemDetailsReducer ,
    basket: basketReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
    Reducer, initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default Store;