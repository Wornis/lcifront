import {FORM_SUBMIT, FORM_SUBMIT_SUCCESS, FORM_INIT, FORM_SUBMIT_ERROR} from 'Constants/ActionTypes';

const initialState = {
  isLoading: false,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SUBMIT:
      return {isLoading: true};
    case FORM_SUBMIT_SUCCESS:
      return {
        isLoading: false,
        datasInserted: true,
      };
    case FORM_SUBMIT_ERROR:
      return {
        isLoading: false
      };
    case FORM_INIT:
      return {...initialState};
    default:
      return state;
  }
};

export default formReducer;
