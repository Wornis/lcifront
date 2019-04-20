import {FORM_SUBMITTED, FORM_RESPONSE_RECEIVED, FORM_INIT} from 'Constants/ActionTypes';

const initialState = {
    isLoading: false,
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORM_SUBMITTED:
            return {isLoading: true};
        case FORM_RESPONSE_RECEIVED: {
            const datasInserted = action.status === 200;
            return {
                isLoading: false,
                datasInserted,
                error: action.error,
                clearFields: action.error === undefined
            };
        }
        case FORM_INIT:
            return {...initialState};
        default:
            return state;
    }
};

export default formReducer;
