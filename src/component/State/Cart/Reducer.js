import { LOGOUT } from "../Authentication/ActionType";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_ERROR, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";


const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_CART_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FIND_CART_SUCCESS:
        case CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                cart: action.payload,
                cartItems: action.payload.item
            }

        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [action.payload, ...state.cartItems]
            }
        case UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map(item => item.id === action.payload.id ? action.payload : item),
            }
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.item
            }
        case FIND_CART_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
        case REMOVE_CART_ITEM_FAILURE:
        case ADD_ITEM_TO_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem("jwt")
            return {
                ...state,
                cartItems: [],
                cart: null,
            }
        case REMOVE_ERROR:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}