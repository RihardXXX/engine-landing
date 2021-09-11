import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers';

const store = createStore(reducer,   applyMiddleware(
    thunkMiddleware, // позволяет нам отправлять функции
));

export default store;
