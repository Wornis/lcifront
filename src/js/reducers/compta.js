import {COMPTA_FETCH, COMPTA_FETCH_SUCCESS, COMPTA_FETCH_ERROR, COMPTA_ERROR_CLEAN} from 'Constants/ActionTypes';

const initialState = {
    recettes:[],
    totaux:{
        emplacements: [],
        total: {},
        isLoading: false
    }
};

const comptaReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPTA_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case COMPTA_FETCH_SUCCESS:
            return {
                ...state,
                recettes: action.datas.recettes,
                totaux: action.datas.totaux,
                isLoading: false
            };
        case COMPTA_FETCH_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case COMPTA_ERROR_CLEAN:
            return {...initialState};
        default:
            return state;
    }
};

export default comptaReducer;
