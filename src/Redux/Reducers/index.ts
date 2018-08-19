import { combineReducers }                            from 'redux'

import authReducer                                    from './authReducer';
import userReducer                                    from './userReducer';

import * as Models                                    from 'src/Models';

export const rootReducer = combineReducers<Models.StateType>({
  authState:    authReducer,
  currentUser:  userReducer,
});