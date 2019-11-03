import {TOAST_SUCCESS, TOAST_ERROR, TOAST_CLEAN} from "Constants/ActionTypes";

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
    case TOAST_CLEAN:
      return {...initialState};
    default:
      return state;
  }
};

export default toastReducer;
