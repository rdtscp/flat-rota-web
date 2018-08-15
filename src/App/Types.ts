/* App/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Copmonent */
import { IAppStyle }                                  from './Styles';

interface IAppProps {
  authState:            Models.AuthStateType;
  currentUser:          Models.User;
  setCurrentUserAction: (authToken: string) => ((dispatch: Dispatch) => void);
  setAuthStateAction:   (authToken: string) => ((dispatch: Dispatch) => void);
}

type AppProps = IAppProps & IAppStyle;

export { AppProps };