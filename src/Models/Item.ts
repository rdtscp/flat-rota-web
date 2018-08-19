/* React/Redux/Other */
// import axios, { AxiosResponse }                       from 'axios';
// import axiosRetry                                     from 'axios-retry';

/* This Project */
import * as Models                                    from 'src/Models';
// import    store                                       from 'src/Redux/Store';
// import network                                        from 'src/Resources/networkHelper';

interface IItemType {
  readonly id:          string;
  readonly flat:        Models.Flat;
  readonly name:        string;
  readonly price:       string;
  readonly rota:        Models.User[];
}

export type Item = IItemType;

/* API Types */

interface IItemResponseData {
  error:    boolean;
  warning:  boolean;
  message:  string;
  content:  Item | null;
}

export type ItemResponseData = IItemResponseData;

/* API */

export const ItemAPI = {

  get() {
    // const authToken = store.getState().authState.authToken;
    return '@TODO';
  },

  create(username: string, password: string) {
    // const authToken: string = store.getState().authState.authToken;
    return '@TODO';
  },

  destroy(deviceID: string, deviceAuthToken: string) {
    // const authToken: string = store.getState().authState.authToken;
    return '@TODO';
    // return new Promise((resolve, reject) => {
    //   axiosRetry(axios, { retries: 10 });
    //   network.getCSRF((csrf: string) => {
    //     axiosRetry(axios, { retries: 0 });
    //     axios.post(process.env.REACT_APP_API_URL + '/device/destroy', {
    //       _csrf: csrf,
    //       authToken,
    //       deviceAuthToken,
    //         deviceID,
    //     },{
    //       withCredentials: true,
    //     })
    //     .then((response: AxiosResponse) => {
    //       const data: DeviceResponseData = response.data;
    //       return resolve(data);
    //     })
    //     .catch((error) => {
    //       return reject(error);
    //     });
    //   });
    // });
  },

  update() {
    // const authToken: string = store.getState().authState.authToken;
    return '@TODO';
  }

}