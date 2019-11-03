import {TOAST_SUCCESS, TOAST_ERROR} from "Constants/ActionTypes";

const initialState = {success: null, error: null};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOAST_SUCCESS:
      return {
        ...state,
        success: action.msg
      };
    case TOAST_ERROR:
      return {
        ...state,
        error: action.msg
      };
    default:
      return state;
  }
};

export default toastReducer;
