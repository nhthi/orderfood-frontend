import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_FAILURE, SEARCH_MENU_REQUEST, SEARCH_MENU_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";

const initialState = {
    menuItems: [],
    loading: false,
    error: null,
    search: [],
    message: null
}

export const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MENU_ITEM_REQUEST:
        case GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST:
        case DELETE_MENU_ITEM_REQUEST:
        case SEARCH_MENU_REQUEST:
        case UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }
        case CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: [...state.menuItems, action.payload],
                message: "Food created Successfully"
            }
        case GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: action.payload,
            }
        case DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: state.menuItems.filter(item => item.id !== action.payload),
            }
        case UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            console.log("Update items id: ", action.payload.id);
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: state.menuItems.map(item => item.id === action.payload.id ? action.payload : item),
            }
        case SEARCH_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                search: action.payload
            }
        case CREATE_MENU_ITEM_FAILURE:
        case GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE:
        case DELETE_MENU_ITEM_FAILURE:
        case SEARCH_MENU_FAILURE:
        case UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            }
        default:
            return state;
    }
}