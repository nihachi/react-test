import * as type from "../types";

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case type.GET_LOCATIONS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.locations,
      };
    case type.GET_LOCATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
