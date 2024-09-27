import {GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";


const initialState = {
    loading: false,
    error: null,
    orders: [],
    notificaiton: [],
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_USERS_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload
            }
        case GET_USERS_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}