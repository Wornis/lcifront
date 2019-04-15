import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {rootReducer, rootEpic} from 'Reducers';
import DevTools from './DevTools';

const epicMiddleware = createEpicMiddleware();
const storeEnhancers = [DevTools.instrument()];

const combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore = applyMiddleware(epicMiddleware)(combinedCreateStore);

const configureStore = () => {
    const store = finalCreateStore(rootReducer);
    epicMiddleware.run(rootEpic);
    return store;
};

export default configureStore();
