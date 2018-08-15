import { applyMiddleware, createStore, Store }        from 'redux';
import { composeWithDevTools }                        from 'redux-devtools-extension/developmentOnly';
import thunk                                          from 'redux-thunk';

import * as Models                                    from 'src/Models';
import { rootReducer }                                from 'src/State/Reducers';

const intitialStore: Models.StateType = {
  authState: {
    authStatus: false,
    authToken:  '',
  },
  currentUser: {
    createdAt:  0,
    devices:    [],
    id:         '',
    updatedAt:  0,
    username:   ''
  }
};

const middlewares = [thunk];
const enhancer    = composeWithDevTools(
  applyMiddleware(...middlewares),
);

const store: Store<Models.StateType> = createStore(rootReducer, intitialStore, enhancer);

export default store;