import { api } from "../../config/api"
import { CREATE_INGRDIENT_FAILURE, CREATE_INGRDIENT_REQUEST, CREATE_INGRDIENT_SUCCESS, CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from "./ActionType";


export const getIngredientOfRestaurant = (id) => async (dispatch)=>{
    try {
        const {data} = await api.get(`/api/admin/ingredients/restaurant/${id}`)
        console.log("get all ingredients ",data);
        dispatch({type:GET_INGREDIENTS,payload:data})
    } catch (error) {
        console.log("error",error);
    }
}

export const createIngredients = (reqData) => async (dispatch)=>{
    dispatch({type:CREATE_INGRDIENT_REQUEST})
    try {
        const {data} = await api.post(`/api/admin/ingredients`,reqData)
        console.log("create ingredient ",data);
        dispatch({type:CREATE_INGRDIENT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:CREATE_INGRDIENT_FAILURE,payload:error})
        console.log("error",error);
    }
}

export const createIngredientsCategory = (reqData) => async (dispatch)=>{
    dispatch({type:CREATE_INGREDIENT_CATEGORY_REQUEST})
    try {
        const {data} = await api.post(`/api/admin/ingredients/category`,reqData)
        console.log("create ingredient category",data);
        dispatch({type:CREATE_INGREDIENT_CATEGORY_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:CREATE_INGREDIENT_CATEGORY_FAILURE,payload:error})
        console.log("error",error);
    }
}
export const updateStokeIngredients = (id) => async (dispatch)=>{
    try {
        const {data} = await api.put(`/api/admin/ingredients/${id}/stock`)
        console.log("update ingredient stoke",data);
        dispatch({type:UPDATE_STOCK,payload:data})
    } catch (error) {
        console.log("error",error);
    }
}

export const getIngredientCategory = (id) => async (dispatch)=>{
    dispatch({type:GET_INGREDIENT_CATEGORY_REQUEST})
    try {
        const {data} = await api.get(`/api/admin/ingredients/restaurant/${id}/category`)
        console.log("get ingredient category ",data);
        dispatch({type:GET_INGREDIENT_CATEGORY_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_INGREDIENT_CATEGORY_FAILURE,payload:error})
        console.log("error",error);
    }
}