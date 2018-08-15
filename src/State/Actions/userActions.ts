/* Types */
import { Dispatch }                                   from 'redux';
import { UserAPI, UserResponseData }                   from 'src/Models';
import { SET_CURR_USER }                              from './actionTypes';

const setCurrentUserAction = (authToken: string) => ((dispatch: Dispatch) => {
    UserAPI.get(authToken)
    .then((data: UserResponseData) => {
      // Received User Model.
      return dispatch({
        payload: data.content,
        type: SET_CURR_USER
      });
    })
    .catch((data: UserResponseData) => {
      // Did not receive User Model.
      return dispatch({
        payload: undefined,
        type: SET_CURR_USER
      });
    })
});

export { setCurrentUserAction };