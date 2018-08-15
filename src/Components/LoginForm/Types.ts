/* Components/LoginForm/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { ILoginFormStyle }                            from './Styles';

interface ILoginFormProps {
  authState:                    Models.AuthStateType;
  setAuthStateAction:           (authToken: string) => ((dispatch: Dispatch) => void);
  setCurrentUserAction:         (authToken: string) => ((dispatch: Dispatch) => void);
}

interface ILoginFormState {
  password:                 string;
  showPassword:             boolean;
  snackbarMessage:          string;
  snackbarOpen:             boolean;
  username:                 string;
}

type LoginFormProps = ILoginFormProps & ILoginFormStyle;
type LoginFormState = ILoginFormState;

export { LoginFormProps, LoginFormState }