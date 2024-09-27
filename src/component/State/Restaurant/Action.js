import { api } from "../../config/api"
import * as types from "./ActionType"



export const getAllRestaurantsAction = () => async(dispatch)=>{
    dispatch({type:types.GET_ALL_RESTAURANT_REQUEST})
    try {
        const {data} = await api.get(`/api/restaurants`)
        dispatch({type:types.GET_ALL_RESTAURANT_SUCCESS,payload:data})
        console.log("get all restaurants success: ",data);

    } catch (error) {
        dispatch({type:types.GET_ALL_RESTAURANT_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const getRestaurantByIdAction = (restaurantId) => async(dispatch)=>{
    dispatch({type:types.GET_RESTAURANT_BY_ID_REQUEST})
    try {
        const {data} = await api.get(`/api/restaurants/${restaurantId}`)
        dispatch({type:types.GET_RESTAURANT_BY_ID_SUCCESS,payload:data})
        console.log("get restaurants by id success: ",data);

    } catch (error) {
        dispatch({type:types.GET_RESTAURANT_BY_ID_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const getRestaurantByUserIdAction = () => async(dispatch)=>{
    dispatch({type:types.GET_RESTAURANT_BY_USER_ID_REQUEST})
    try {
        const {data} = await api.get(`/api/admin/restaurants/user`)
        dispatch({type:types.GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:data})
        console.log("get restaurant by user id success: ",data);

    } catch (error) {
        dispatch({type:types.GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const createRestaurant = (reqData) => async(dispatch)=>{
    dispatch({type:types.CREATE_RESTAURANT_REQUEST})
    try {
        const {data} = await api.post(`/api/admin/restaurants`,reqData)
        dispatch({type:types.CREATE_RESTAURANT_SUCCESS,payload:data})
        console.log("create restaurant success: ",data);

    } catch (error) {
        dispatch({type:types.CREATE_RESTAURANT_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const updateRestaurant = (reqData) => async(dispatch)=>{
    dispatch({type:types.UPDATE_RESTAURANT_REQUEST})
    try {
        const {data} = await api.put(`/api/admin/restaurants/${reqData.restaurantId}`,reqData.restaurantData)
        dispatch({type:types.UPDATE_RESTAURANT_SUCCESS,payload:data})
        console.log("update restaurant success: ",data);

    } catch (error) {
        dispatch({type:types.UPDATE_RESTAURANT_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const deleteRestaurant = (restaurantId) => async(dispatch)=>{
    dispatch({type:types.DELETE_RESTAURANT_REQUEST})
    try {
        const {data} = await api.delete(`/api/admin/restaurants/${restaurantId}`)
        dispatch({type:types.DELETE_RESTAURANT_SUCCESS,payload:restaurantId})
        console.log("delete restaurant success: ",data);

    } catch (error) {
        dispatch({type:types.DELETE_RESTAURANT_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const updateRestaurantStatus = (restaurantId) => async(dispatch)=>{
    dispatch({type:types.UPDATE_RESTAURANT_STATUS_REQUEST})
    try {
        const {data} = await api.put(`/api/admin/restaurants/${restaurantId}/status`)
        dispatch({type:types.UPDATE_RESTAURANT_STATUS_SUCCESS,payload:data})
        console.log("update restaurant status success: ",data);

    } catch (error) {
        dispatch({type:types.UPDATE_RESTAURANT_STATUS_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const createEventAction = (reqData) => async(dispatch)=>{
    dispatch({type:types.CREATE_EVENTS_REQUEST})
    try {
        const {data} = await api.post(`/api/admin/events`,reqData)
        dispatch({type:types.CREATE_EVENTS_SUCCESS,payload:data})
        console.log("create event success: ",data);

    } catch (error) {
        dispatch({type:types.CREATE_EVENTS_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const getAllEvents = () => async(dispatch)=>{
    dispatch({type:types.GET_ALL_EVENTS_REQUEST})
    try {
        const {data} = await api.get(`/api/events`)
        dispatch({type:types.GET_ALL_EVENTS_SUCCESS,payload:data})
        console.log("get all events success: ",data);

    } catch (error) {
        dispatch({type:types.GET_ALL_EVENTS_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const deleteEvent = (eventId) => async(dispatch)=>{
    dispatch({type:types.DELETE_EVENTS_REQUEST})
    try {
        const {data} = await api.delete(`/api/admin/events/${eventId}`)
        dispatch({type:types.DELETE_EVENTS_SUCCESS,payload:eventId})
        console.log("delete event success: ",data);

    } catch (error) {
        dispatch({type:types.DELETE_EVENTS_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const getRestaurantEvents = (restaurantId) => async(dispatch)=>{
    dispatch({type:types.GET_RESTAURANT_EVENTS_REQUEST})
    try {
        const {data} = await api.get(`/api/admin/events/restaurants/${restaurantId}`)
        dispatch({type:types.GET_RESTAURANT_EVENTS_SUCCESS,payload:data})
        console.log("get restaurant event success: ",data);

    } catch (error) {
        dispatch({type:types.GET_RESTAURANT_EVENTS_FAILURE,payload:error})
        console.log('error: ',error);
    }
}

export const createCategoryAction = (reqData) => async(dispatch)=>{
    dispatch({type:types.CREATE_CATEGORY_REQUEST})
    try {
        console.log(reqData);
        const {data} = await api.post(`/api/admin/category`,reqData)
        dispatch({type:types.CREATE_CATEGORY_SUCCESS,payload:data})
        console.log("create category success: ",data);

    } catch (error) {
        dispatch({type:types.CREATE_CATEGORY_FAILURE,payload:error})
        console.log('error: ',error);
    }
}


// xem lai ben spring
export const getRestaurantCategory = (id) => async(dispatch)=>{
    dispatch({type:types.GET_RESTAURANT_CATEGORY_REQUEST})
    try {
        const {data} = await api.get(`/api/category/restaurant/${id}`)
        dispatch({type:types.GET_RESTAURANT_CATEGORY_SUCCESS,payload:data})
        console.log("get restauratn category success: ",data);

    } catch (error) {
        dispatch({type:types.GET_RESTAURANT_CATEGORY_FAILURE,payload:error})
        console.log('error: ',error);
    }
}