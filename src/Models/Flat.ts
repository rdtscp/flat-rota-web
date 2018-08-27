/* React/Redux/Other */
import axios, { AxiosResponse }                       from 'axios';
// import axios                       from 'axios';

/* This Project */
import * as Models                                    from 'src/Models';
import store                                          from 'src/Redux/Store';
import network                                        from 'src/Resources/networkHelper';

export {
  Flat,
  FlatAPI,
  FlatResponseData,
};

interface IFlatType {
  readonly members:     Models.User[];
  readonly id:          string;
  readonly name:        string;
  readonly items:       Models.Item[];
}

type Flat = IFlatType;

/* API Types */

interface IFlatResponseData {
  error:    boolean;
  warning:  boolean;
  message:  string;
  content:  Flat | null;
}

type FlatResponseData = IFlatResponseData;

/* API */

const FlatAPI = {

  get(flatID: string) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/flat/get', {
          _csrf: csrf,
          authToken,
          flatID,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: FlatResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  create(flatName: string, flatMembers: string[]) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/flat/create', {
          _csrf: csrf,
          authToken,
          flatMembers,
          flatName,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: FlatResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  update(flatID: string, newMembersUsernames: string[]) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/flat/update', {
          _csrf: csrf,
          authToken,
          flatID,
          newMembersUsernames,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: FlatResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  destroy(flatID: string) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/flat/destroy', {
          _csrf: csrf,
          authToken,
          flatID,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: FlatResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  leave(flatID: string) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      network.getCSRF((csrf: string) => {
        axios.post(process.env.REACT_APP_API_URL + '/flat/leave', {
          _csrf: csrf,
          authToken,
          flatID,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: FlatResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

}