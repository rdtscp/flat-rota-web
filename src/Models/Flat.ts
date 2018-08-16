/* React/Redux/Other */
import axios, { AxiosResponse }                       from 'axios';
// import axios                       from 'axios';

/* This Project */
import * as Models                                    from 'src/Models';
import network                                        from 'src/Resources/networkHelper';

export {
  Flat,
  FlatAPI,
  FlatResponseData,
};

interface IFlatType {
  readonly members:     Models.User[];
  readonly createdAt:   number;
  readonly updatedAt:   number;
  readonly id:          string;
  readonly name:        string;
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

  get(authToken: string, flatID: string) {
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

  create(authToken: string, flatName: string, flatMembers: string[]) {
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

  update(authToken: string) {
    return '@TODO';
  },

  destroy(authToken: string) {
    return '@TODO';
  },

}