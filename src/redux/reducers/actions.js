import * as type from "../types";

const initialState = {
  data: {
    location: null,
    description: null,
  },
  id: null,
  loading: false,
  success: false,
  viewed: false,
  error: null,
};

export default function actions(state = initialState, action) {
  switch (action.type) {
    case type.ADD_LOCATION_REQUESTED:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case type.ADD_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.data,
      };
    case type.ADD_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.message,
      };
    case type.DELETE_LOCATION_REQUESTED:
      return {
        ...state,
        id: action.payload,
        success: false,
      };
    case type.DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        id: action.payload,
        success: true,
      };
    case type.DELETE_LOCATION_FAILED:
      return {
        ...state,
        success: false,
        error: action.message,
      };
    case type.VIEW_LOCATION_REQUESTED:
      return {
        ...state,
        id: action.payload,
        viewed: false,
      };
    case type.VIEW_LOCATION_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        data: {
          location: action.payload.location,
          description: action.payload.description,
        },
        viewed: true,
      };
    case type.VIEW_LOCATION_FAILED:
      return {
        ...state,
        viewed: false,
        error: action.message,
      };
    case type.UPDATE_LOCATION_REQUESTED:
      return {
        ...state,
        id: action.payload,
        success: false,
      };
    case type.UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        id: action.payload,
        success: true,
      };
    case type.UPDATE_LOCATION_FAILED:
      return {
        ...state,
        success: false,
        error: action.message,
      };
    default:
      return state;
  }
}
