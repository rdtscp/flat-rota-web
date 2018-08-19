/* React/Redux/Other */
import axios, { AxiosResponse }                       from 'axios';
import axiosRetry                                     from 'axios-retry';

/* This Project */
import * as Models                                    from 'src/Models';
import    store                                       from 'src/Redux/Store';
import network                                        from 'src/Resources/networkHelper';

interface IItemType {
  readonly id:            string;
  readonly flat:          Models.Flat;
  readonly name:          string;
  readonly description:   string;
  readonly rota:          Models.User[];
  readonly notification:  boolean;
  readonly lastBumped:    number;
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

  create(flatID: string, name: string, description: string) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      axiosRetry(axios, { retries: 10 });
      network.getCSRF((csrf: string) => {
        axiosRetry(axios, { retries: 0 });
        axios.post(process.env.REACT_APP_API_URL + '/item/create', {
          _csrf: csrf,
          authToken,
          description,
          flatID,
          name,
          notification: false
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: ItemResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  destroy(itemID: string) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      axiosRetry(axios, { retries: 10 });
      network.getCSRF((csrf: string) => {
        axiosRetry(axios, { retries: 0 });
        axios.post(process.env.REACT_APP_API_URL + '/item/destroy', {
          _csrf: csrf,
          authToken,
          itemID
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: ItemResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  update(itemID: string, description: string) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      axiosRetry(axios, { retries: 10 });
      network.getCSRF((csrf: string) => {
        axiosRetry(axios, { retries: 0 });
        axios.post(process.env.REACT_APP_API_URL + '/item/update', {
          _csrf: csrf,
          authToken,
          itemID
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: ItemResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  },

  setStatus(itemID: string, flatID: string, cleared: boolean, bump: boolean) {
    const authToken: string = store.getState().authState.authToken;
    return new Promise((resolve, reject) => {
      axiosRetry(axios, { retries: 10 });
      network.getCSRF((csrf: string) => {
        axiosRetry(axios, { retries: 0 });
        axios.post(process.env.REACT_APP_API_URL + '/item/setstatus', {
          _csrf: csrf,
          authToken,
          bump,
          cleared,
          flatID,
          itemID,
        },{
          withCredentials: true,
        })
        .then((response: AxiosResponse) => {
          const data: ItemResponseData = response.data;
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
      });
    });
  }

}