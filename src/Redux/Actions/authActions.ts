/* Types */
import { Dispatch }                                   from 'redux';
import * as Models                                    from 'src/Models';
import { SET_AUTH }                                   from './actionTypes';

const setAuthStateAction = (localAuthToken: string) => ((dispatch: Dispatch) => {
  Models.DeviceAPI.get(localAuthToken)
  .then((deviceData: Models.DeviceResponseData) => {
    // Succesfully Retrieved AuthStatus
    if (deviceData.content !== null && 'authStatus' in deviceData.content && deviceData.content.authStatus === true) {
      return dispatch({
        payload: deviceData.content,
        type: SET_AUTH
      });
    }
    else {
      localStorage.removeItem('authToken');
      return dispatch({
        payload: {
          authStatus: false,
          authToken:  null
        },
        type: SET_AUTH
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