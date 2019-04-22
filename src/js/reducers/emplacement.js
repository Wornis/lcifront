import {EMPLACEMENT_FETCH_ERROR, EMPLACEMENT_FETCH_SUCCESS, EMPLACEMENT_ERROR_CLEAN} from 'Constants/ActionTypes';

const initialState = {
    emplacements: [],
};

const emplacementReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLACEMENT_FETCH_SUCCESS:
            return {
                ...state,
                emplacements: action.emplacements
            };
        case EMPLACEMENT_FETCH_ERROR:
            return {
                ...state,
                error: action.error
            };
        case EMPLACEMENT_ERROR_CLEAN:
            return {...initialState};
        default:
            return state;
    }
};

export default emplacementReducer;
