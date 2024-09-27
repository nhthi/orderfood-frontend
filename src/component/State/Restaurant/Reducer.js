import * as types from "./ActionType"

const initialState = {
    restaurants: [],
    userRestaurant: null,
    restaurant: null,
    loading: false,
    error: null,
    events: [],
    restaurantEvents: [],
    categories: [],
}

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_RESTAURANT_REQUEST:
        case types.GET_ALL_RESTAURANT_REQUEST:
        case types.DELETE_RESTAURANT_REQUEST:
        case types.UPDATE_RESTAURANT_REQUEST:
        case types.GET_RESTAURANT_BY_ID_REQUEST:
        case types.CREATE_CATEGORY_REQUEST:
        case types.GET_RESTAURANT_CATEGORY_REQUEST:
        case types.CREATE_EVENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userRestaurant: action.payload
            }
        case types.GET_ALL_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurants: action.payload
            }
        case types.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurant: action.payload
            }
        case types.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case types.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case types.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                userRestaurant: action.payload
            }
        case types.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                restaurants: state.restaurants.filter(item => item.id !== action.payload),
                userRestaurant: state.userRestaurant.filter(item => item.id !== action.payload)
            }
        case types.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload],
                restaurantEvents: [...state.restaurantEvents, action.payload]
            }
        case types.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload
            }
        case types.GET_RESTAURANT_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurantEvents: action.payload
            }
        case types.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter(item => item.id !== action.payload),
                restaurantEvents: state.restaurantEvents.filter(item => item.id !== action.payload),
            }
        case types.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload]
            }
        case types.GET_RESTAURANT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload
            }
        case types.CREATE_RESTAURANT_FAILURE:
        case types.GET_ALL_RESTAURANT_FAILURE:
        case types.DELETE_RESTAURANT_FAILURE:
        case types.UPDATE_RESTAURANT_FAILURE:
        case types.GET_RESTAURANT_BY_ID_FAILURE:
        case types.CREATE_CATEGORY_FAILURE:
        case types.GET_RESTAURANT_CATEGORY_FAILURE:
        case types.CREATE_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}