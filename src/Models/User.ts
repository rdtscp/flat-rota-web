/* React/Redux/Other */
import axios, { AxiosResponse }                       from 'axios';

/* This Project */
import * as Models                                    from 'src/Models';
import store                                          from 'src/Redux/Store';
import network                                        from 'src/Resources/networkHelper';

export {
  User,
  UserAPI,
  UserResponseData,
};

interface IUserType {
  readonly devices:     Models.Device[];
  readonly id:          string;
  readonly username:    string;
  readonly flats:       Models.Flat[];
}

type User = IUserType;

/* API Types */

interface IUserResponseData {
  error:    boolean;
  warning:  boolean;
  message:  string;
  content:  User | null;
}

type UserResponseData = IUserResponseData;

/* API */

const UserAPI = {

  get() {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/user/get', {
          _csrf: csrf,
          authToken,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: UserResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  create(username: string, password: string) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/user/create', {
          _csrf: csrf,
          authToken,
          password,
          username,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: UserResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  update() {
    // const authToken: string = store.getState().authState.authToken;
    return '@TODO';
  },

  destroy() {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/user/destroy', {
          _csrf: csrf,
          authToken,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: UserResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

}