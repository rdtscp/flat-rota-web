/* React/Redux/Other */
import axios, { AxiosResponse }                       from 'axios';
import axiosRetry                                     from 'axios-retry';

/* This Project */
import network                                        from 'src/Resources/networkHelper';

interface IDeviceType {
  readonly createdAt:   number;
  readonly updatedAt:   number;
  readonly id:          string;
  readonly lastUsed:    number;
  readonly authToken:   string;
  readonly ip:          string;
  readonly userAgent:   string;
  readonly owner:       string;
}

export type Device = IDeviceType;

/* API Types */

interface IDeviceResponseData {
  error:    boolean;
  warning:  boolean;
  message:  string;
  content:  { authStatus: boolean; authToken: string } |
            { tokenValid: boolean } |
            null;
}

export type DeviceResponseData = IDeviceResponseData;

/* API */

export const DeviceAPI = {

  get(authToken: string) {
    return new Promise((resolve, reject) => {
      axiosRetry(axios, { retries: 10 });
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/device/get', {
          _csrf: csrf,
          authToken,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: DeviceResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  create(authToken: string, username: string, password: string) {
    return new Promise((resolve, reject) => {
      axiosRetry(axios, { retries: 10 });
      network.getCSRF((csrf: string) => {
        axiosRetry(axios, { retries: 1 });
        axios.post(process.env.REACT_APP_API_URL + '/device/create', {
          _csrf: csrf,
          authToken,
          password,
          username,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: DeviceResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  destroy(authToken: string, deviceID: string, deviceAuthToken: string) {
    return new Promise((resolve, reject) => {
      axiosRetry(axios, { retries: 10 });
      network.getCSRF((csrf: string) => {
        axiosRetry(axios, { retries: 1 });
        axios.post(process.env.REACT_APP_API_URL + '/device/destroy', {
          _csrf: csrf,
          authToken,
          deviceAuthToken,
            deviceID,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: DeviceResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

}