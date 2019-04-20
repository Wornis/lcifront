import {FORM_SUBMITTED, FORM_RESPONSE_RECEIVED} from 'Constants/ActionTypes';

const initialState = {
    isLoading: false
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORM_SUBMITTED:
            return { isLoading: true };
        case FORM_RESPONSE_RECEIVED:
            return { isLoading: false };
        default:
            return state;
    }
};

export default formReducer;
