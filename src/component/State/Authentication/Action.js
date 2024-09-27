import axios from "axios";
import { API_URL, api } from "../../config/api";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_RRQUEST, ADD_TO_FAVORITE_SUCCESS, CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, FORGOT_PASSWORD, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, GET_USER_FAILURE, GET_USER_FAVOURITE_FAILURE, GET_USER_FAVOURITE_REQUEST, GET_USER_FAVOURITE_SUCCESS, GET_USER_RRQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_RRQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_RRQUEST, REGISTER_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_RRQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt)
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })
        console.log("register success");
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error })
        console.log("error: ", error);
    }
}

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_RRQUEST })
    try {

        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt)
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })
        console.log("Loginn success: ", data);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error })
        console.log("error: ", error);
    }
}

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_RRQUEST })
    try {

        const { data } = await api.get(`/api/users/profile`)

        dispatch({ type: GET_USER_SUCCESS, payload: data })
        console.log('User profile: ', data);
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error })
        console.log("error: ", error);
    }
}

export const getUserFavourites = () => async (dispatch) => {
    dispatch({ type: GET_USER_FAVOURITE_REQUEST })
    try {

        const { data } = await api.get(`/api/restaurants/user/favourites`)

        dispatch({ type: GET_USER_FAVOURITE_SUCCESS, payload: data })
        console.log('User favourites: ', data);
    } catch (error) {
        dispatch({ type: GET_USER_FAVOURITE_FAILURE, payload: error })
        console.log("error: ", error);
    }
}

export const addToFavourites = (restaurantId) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_RRQUEST })
    try {
        const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favourites`)
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data })
        console.log('add favorites success: ', data);
    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error })
        console.log("error: ", error);
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('jwt')
        dispatch({ type: LOGOUT })
        console.log('log out success: ');
    } catch (error) {
        console.log("error: ", error);
    }
}


export const forgotPassword = (email) => async (dispatch) => {
    try {
        const { data } = await api.post(`/auth/forgot-password?email=${email}`)
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data })
        console.log('send email success: ');
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error })
        console.log("error: ", error);
    }
}

export const resetPassword = (req) => async (dispatch) => {
    try {
        const { data } = await api.post(`/auth/reset-password`, req)
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })
        console.log('reset notify: ', data);
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: error })
        console.log("error: ", error);
    }
}

export const createAddress = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ADDRESS_REQUEST })
    try {
        const { data } = await api.post(`/api/address`, reqData)
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data })
        console.log("create address: ", data);
    } catch (error) {
        console.log("error",error);
        dispatch({type:CREATE_ADDRESS_FAILURE,payload:error})
    }
}

export const updateUserProfile = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST })
    try {
        const { data } = await api.put(`/api/users/profile`, reqData)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
        console.log("update profile : ", data);
    } catch (error) {
        console.log("error",error);
        dispatch({type:UPDATE_USER_FAILURE,payload:error})
    }
}