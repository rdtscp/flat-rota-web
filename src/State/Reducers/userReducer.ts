import { Reducer }                                    from 'redux';

import * as Models                                    from 'src/Models';
import { SET_CURR_USER }                              from 'src/State/Actions/actionTypes';

const initialState = {
} as Models.User;

const userReducer: Reducer<Models.User> = (state: Models.User = initialState, action: any) => {
  switch (action.type) {
    case SET_CURR_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default userReducer;