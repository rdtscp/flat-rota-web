/* React/Redux/Other */
// import axios, { AxiosResponse }                       from 'axios';

/* This Project */
import * as Models                                    from 'src/Models';
// import network                                        from 'src/Resources/networkHelper';

export {
  Flat,
  FlatAPI,
  // UserResponseData,
};

interface IFlatType {
  readonly members:     Models.User[];
  readonly createdAt:   number;
  readonly updatedAt:   number;
  readonly id:          string;
  readonly groupName:   string;
}

type Flat = IFlatType;

/* API Types */

// interface IUserResponseData {
//   error:    boolean;
//   warning:  boolean;
//   message:  string;
//   content:  User | null;
// }

// type UserResponseData = IUserResponseData;

/* API */

const FlatAPI = {

  get(authToken: string) {
    
    return '@TODO';
  },

  create(authToken: string, flatName: string, flatMembers: string[]) {
    return '@TODO';
  },

  update(authToken: string) {
    return '@TODO';
  },

  destroy(authToken: string) {
    return '@TODO';
  },

}