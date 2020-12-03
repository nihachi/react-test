import * as type from "../types";

export function getLocations(locations) {
  return {
    type: type.GET_LOCATIONS_REQUESTED,
    payload: locations,
  };
}

export function createLocation(data) {
  return {
    type: type.ADD_LOCATION_REQUESTED,
    payload: data,
  };
}

export function viewLocation(id) {
  return {
    type: type.VIEW_LOCATION_REQUESTED,
    payload: id,
  };
}

export function updateLocation(id, data) {
  return {
    type: type.UPDATE_LOCATION_REQUESTED,
    id: id,
    payload: data,
  };
}

export function deleteLocation(id) {
  return {
    type: type.DELETE_LOCATION_REQUESTED,
    payload: id,
  };
}
