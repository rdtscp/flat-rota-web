/* Types */
import { Dispatch }                                   from 'redux';
import * as Models                                    from 'src/Models';
import { SET_AUTH, SET_CURR_USER }                    from './actionTypes';

const setAuthStateAction = (localAuthToken: string) => ((dispatch: Dispatch) => {
  Models.DeviceAPI.get(localAuthToken)
  .then((deviceData: Models.DeviceResponseData) => {
    // Succesfully Retrieved AuthStatus
    if (deviceData.content !== null && 'authStatus' in deviceData.content && deviceData.content.authStatus === true) {
      Models.UserAPI.get(deviceData.content.authToken)
      .then((userData: Models.UserResponseData) => {
        dispatch({
          payload: deviceData.content,
          type: SET_AUTH
        });
        return dispatch({
          payload: userData.content,
          type: SET_CURR_USER
        });
      })
      .catch((err: any) => {
      localStorage.removeItem('authToken')
        alert('Unexpected Error. Reloading...');
        window.location.reload();
      });
    }
    else {
      localStorage.removeItem('authToken');
      dispatch({
        payload: {
          authStatus: false,
          authToken:  null
        },
        type: SET_AUTH
      });
      dispatch({
        payload: {
          createdAt:  0,
          devices:    [],
          id:         '',
          updatedAt:  0,
          username:   ''
        },
        type: SET_CURR_USER
      });
    }
  })
  .catch((err: any) => {
    localStorage.removeItem('authToken')
    alert('Unexpected Error. Reloading...');
    window.location.reload();
  });
});

export { setAuthStateAction };