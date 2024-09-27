import { isPresentInFavourites } from '../../config/logic'
import * as TYPE from './ActionType'
const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favourites: [],
    success: null,
    notify:null,
    addresses:[]
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.REGISTER_RRQUEST:
        case TYPE.LOGIN_RRQUEST:
        case TYPE.GET_USER_RRQUEST:
        case TYPE.ADD_TO_FAVORITE_RRQUEST:
        case TYPE.CREATE_ADDRESS_REQUEST:
        case TYPE.GET_USER_FAVOURITE_REQUEST:
        case TYPE.UPDATE_USER_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                success: null
            }
        case TYPE.REGISTER_SUCCESS:
        case TYPE.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                error: null,
                success: "Register Success"
            }
        case TYPE.ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                favourites: isPresentInFavourites(state.favourites, action.payload)
                    ? state.favourites.filter(item => item.id !== action.payload.id)
                    : [action.payload, ...state.favourites]
            }
        case TYPE.GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload,
                success: "Get profile success",
                addresses:action.payload.addresses
            }
        case TYPE.CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                addresses:[...state.addresses,action.payload]
            }
        case 'SET_ERROR_NULL':
            return {
                ...state,
                error:null
            }
        case TYPE.UPDATE_USER_SUCCESS:
            return {
                ...state,
                user:action.payload,
                error:null,
                isLoading:false
            }
        case TYPE.GET_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                addresses:[...state.addresses]
            }
        case TYPE.GET_USER_FAVOURITE_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                error:null,
                favourites:action.payload
            }
        }
        case TYPE.REGISTER_FAILURE:
        case TYPE.LOGIN_FAILURE:
        case TYPE.ADD_TO_FAVORITE_FAILURE:
        case TYPE.FORGOT_PASSWORD_FAILURE:
        case TYPE.RESET_PASSWORD_FAILURE:
        case TYPE.CREATE_ADDRESS_FAILURE:
        case TYPE.GET_USER_FAVOURITE_FAILURE:
        case TYPE.UPDATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            }
        // case TYPE.GET_USER_FAILURE:
        case TYPE.LOGOUT:
            return {
                ...initialState
            }
        case TYPE.FORGOT_PASSWORD_SUCCESS:
            return {
                ...initialState,
                notify:action.payload
            }
        case TYPE.RESET_PASSWORD_SUCCESS:
            return{
                ...initialState,
                notify:action.payload
            }
        default:
            return state
    }
}