import { api } from "../../config/api"
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"


export const findCart = () => async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST })
    try {
        const { data } = await api.get(`/api/cart`)
        dispatch({ type: FIND_CART_SUCCESS, payload: data })
        console.log("my  cart: ", data);
    } catch (error) {
        dispatch({ type: FIND_CART_FAILURE, payload: error })
        console.log('error ', error);
    }
}

export const getAllCartItems = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST })
    try {
        const { data } = await api.get(`/api/carts/${reqData.cartId}/items`)
        dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data })
        console.log("get all cartitem: ", data);
    } catch (error) {
        dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error })
        console.log('error ', error);
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST })
    try {
        const { data } = await api.put(`/api/cart/add`, reqData)
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data })
        console.log("add item to cart: ", data);
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error })
        console.log('error ', error);
    }
}

export const updateCardItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST })
    try {
        const { data } = await api.put(`/api/cart-item/update`, reqData)
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data })
        dispatch(findCart())
        console.log("update cart item : ", data);
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error })
        console.log('error ', error);
    }
}

export const removeCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST })
    try {
        const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`)
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data })
        dispatch(findCart())
        console.log("remove cart item : ", data);
    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error })
        console.log('error ', error);
    }
}

export const clearCartAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST })
    try {
        const { data } = await api.put(`/api/cart/clear`)
        dispatch({ type: CLEAR_CART_SUCCESS, payload: data })
        console.log("clear cart : ", data);
    } catch (error) {
        dispatch({ type: CLEAR_CART_FAILURE, payload: error })
        console.log('error ', error);
    }
}