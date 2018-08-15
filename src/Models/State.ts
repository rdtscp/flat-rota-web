/* This Project */
import * as Models                                    from 'src/Models';

export {
  AuthStateType,
  StateType,
};

interface IAuthStateType {
  readonly authStatus: boolean;
  readonly authToken:  string;
}
type AuthStateType  = IAuthStateType;

interface IStateType {
  readonly authState:   AuthStateType;
  readonly currentUser: Models.User;
}
type StateType      = IStateType;