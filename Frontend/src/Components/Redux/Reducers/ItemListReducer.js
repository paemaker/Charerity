import {
    ITEM_DETAILS_FAILURE,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_LIST_FAILURE,
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS
} from "../Constants/AllConstants";

export const itemListReducer = (state = { items: [] }, action) => {
    switch(action.type) {
        case ITEM_LIST_REQUEST:
            return {
                loading: true
            };
        case ITEM_LIST_SUCCESS:
            return {
                loading: false,
                items: action.payload
            }
        case ITEM_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export const itemDetailsReducer = (state = { item: {}, loading: true }, action) => {
    switch (action.type) {
        case ITEM_DETAILS_REQUEST:
            return {
                loading: true
            }
        case ITEM_DETAILS_SUCCESS:
            return {
                loading: false,
                item: action.payload
            }
        case ITEM_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};