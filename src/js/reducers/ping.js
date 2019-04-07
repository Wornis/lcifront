import {PING, PONG} from '../constants/ActionTypes';

const initialState = {
    isPinging: false
};

const pingReducer = (state = initialState, action) => {
    switch (action.type) {
        case PING:
            return { isPinging: true };
        case PONG:
            return { isPinging: false };
        default:
            return state;
    }
};

export default pingReducer;
