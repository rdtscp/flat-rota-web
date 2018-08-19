/* Types */
import { Dispatch }                                   from 'redux';
import { UserAPI, UserResponseData }                  from 'src/Models';
import { SET_CURR_USER, SET_FLATS }                   from './actionTypes';

import * as Models                                    from 'src/Models';

const setCurrentUserAction = () => ((dispatch: Dispatch) => {
    UserAPI.get()
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

const setCurrentUserFlats = (flats: Models.Flat[]) => ((dispatch: Dispatch) => {
  return dispatch({
    payload: flats,
    type:    SET_FLATS
  });
});

export { setCurrentUserAction, setCurrentUserFlats };