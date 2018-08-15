import { Reducer }                                    from 'redux';

import * as Models                                    from 'src/Models';
import { SET_AUTH }                                   from 'src/State/Actions/actionTypes';

const initialState = {
    authStatus: false,
    authToken: '',
} as Models.AuthStateType;

const authReducer: Reducer<Models.AuthStateType> = (state: Models.AuthStateType = initialState, action: any) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default authReducer;