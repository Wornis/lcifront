import {
    STATS_ERROR_CLEAN,
    STATS_FETCH_ERROR,
    STATS_FETCH_SUCCESS
} from 'Constants/ActionTypes';

const initialState = {
    datasYear: []
};

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATS_FETCH_SUCCESS:
            return {
                ...state,
                datasYear: action.datasYear
            };
        case STATS_FETCH_ERROR:
            return {
                ...state,
                error: action.error
            };
        case STATS_ERROR_CLEAN:
            return {...initialState};
        default:
            return state;
    }
};

export default statsReducer;
