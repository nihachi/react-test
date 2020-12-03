import { call, put, takeEvery } from "redux-saga/effects";
import { fetchGetJSON, fetchPostJSON } from "../../utils/api-helper";
import apiUrl from "../../utils/api-url";

function* fetchLocations(action) {
  try {
    const locations = yield call(fetchGetJSON, apiUrl);
    yield put({ type: "GET_LOCATIONS_SUCCESS", locations: locations });
  } catch (e) {
    yield put({ type: "GET_LOCATIONS_FAILED", message: e.message });
  }
}

function* createLocation(action) {
  try {
    const data = yield call(fetchPostJSON, apiUrl, action.payload, "POST");
    yield put({ type: "ADD_LOCATION_SUCCESS", payload: data });
  } catch (e) {
    yield put({ type: "ADD_LOCATION_FAILED", message: e.message });
  }
}

function* deleteLocation(id) {
  try {
    const data = yield call(
      fetchPostJSON,
      apiUrl + "/" + id.payload,
      "",
      "DELETE"
    );
    yield put({ type: "DELETE_LOCATION_SUCCESS", payload: data });
  } catch (e) {
    yield put({ type: "DELETE_LOCATION_FAILED", message: e.message });
  }
}

function* viewLocation(id) {
  try {
    const data = yield call(fetchGetJSON, apiUrl + "/" + id.payload);
    yield put({ type: "VIEW_LOCATION_SUCCESS", payload: data });
  } catch (e) {
    yield put({ type: "VIEW_LOCATION_FAILED", message: e.message });
  }
}

function* updateLocation(action) {
  try {
    const data = yield call(
      fetchPostJSON,
      apiUrl + "/" + action.id,
      action.payload,
      "PUT"
    );
    yield put({ type: "UPDATE_LOCATION_SUCCESS", payload: data });
  } catch (e) {
    yield put({ type: "UPDATE_LOCATION_FAILED", message: e.message });
  }
}

function* locationSaga() {
  yield takeEvery("GET_LOCATIONS_REQUESTED", fetchLocations);
  yield takeEvery("ADD_LOCATION_REQUESTED", createLocation);
  yield takeEvery("DELETE_LOCATION_REQUESTED", deleteLocation);
  yield takeEvery("VIEW_LOCATION_REQUESTED", viewLocation);
  yield takeEvery("UPDATE_LOCATION_REQUESTED", updateLocation);
}

export default locationSaga;
