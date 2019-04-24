import {COMPTA_FETCH_SUCCESS, COMPTA_FETCH_ERROR, COMPTA_ERROR_CLEAN} from 'Constants/ActionTypes';

const initialState = {
    recettes:[],
    totaux:[]
};

const comptaReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPTA_FETCH_SUCCESS:
            return {
                ...state,
                recettes: action.datas.recettes,
                totaux: action.datas.totaux
            };
        case COMPTA_FETCH_ERROR:
            return {
                ...state,
                error: action.error
            };
        case COMPTA_ERROR_CLEAN:
            return {...initialState};
        default:
            return state;
    }
};

export default comptaReducer;
