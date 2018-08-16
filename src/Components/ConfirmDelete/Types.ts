/* Components/SettingsMenu/ConfirmDelete/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models'

/* This Component */
import { IConfirmDeleteStyle }                        from './Styles';

interface IConfirmDeleteProps {
  authState:            Models.AuthStateType;
  setAuthStateAction:   (authToken: string) => ((dispatch: Dispatch) => void);
}

interface IConfirmDeleteState {
  activeStep: number;
}

type ConfirmDeleteProps = IConfirmDeleteProps & IConfirmDeleteStyle;
type ConfirmDeleteState = {} & IConfirmDeleteState;
 
export { ConfirmDeleteProps, ConfirmDeleteState };