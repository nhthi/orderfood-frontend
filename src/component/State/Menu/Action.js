import { api } from "../../config/api"
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_FAILURE, SEARCH_MENU_REQUEST, SEARCH_MENU_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType"



export const createMenuItem = (menu) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST })
    try {

        const { data } = await api.post(`api/admin/food`, menu)

        console.log("create menu: ", data);

        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error })
        console.log("error", error);
    }
}

export const getMenuItemByRestaurantId = (reqData) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST })
    try {

        const { data } = await api.get(`api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian || false}&seasonal=${reqData.seasonal|| false}&nonveg=${reqData.nonveg|| false}&food_category=${reqData.foodCategory||""}`)

        console.log("get menu item  by restaurant id: ", data);

        dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, payload: error })
        console.log("error", error);
    }
}

export const searchMenuItem = (keyword) => async (dispatch) => {
    dispatch({ type: SEARCH_MENU_REQUEST })
    try {

        const { data } = await api.get(`api/food/search?name=${keyword}`)

        console.log("search food: ", data);

        dispatch({ type: SEARCH_MENU_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: SEARCH_MENU_FAILURE, payload: error })
        console.log("error", error);
    }
}

// export const getAllIngredientsOfMenuItem = (keyword) => async (dispatch) => {
//     dispatch({ type: SEARCH_MENU_REQUEST })
//     try {

//         const { data } = await api.get(`api/food/search?name=${keyword}`)

//         console.log("search food: ", data);

//         dispatch({ type: SEARCH_MENU_SUCCESS, payload: data })

//     } catch (error) {
//         dispatch({ type: SEARCH_MENU_FAILURE, payload: error })
//         console.log("error", error);
//     }
// }

export const updateMenuItemAvailability = (foodId) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST })
    try {

        const { data } = await api.put(`api/admin/food/${foodId}`)

        console.log("update menu item availability food: ", data);

        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error })
        console.log("error", error);
    }
}

export const deleteFoodAction = (foodId) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST })
    try {

        const { data } = await api.delete(`api/admin/food/${foodId}`)

        console.log("delete food success: ", data);

        dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId })

    } catch (error) {
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error })
        console.log("error", error);
    }
}