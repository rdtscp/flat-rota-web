/* Components/SettingsMenu/ConfirmDelete/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */

/* This Component */
import { IConfirmDeleteStyle }                        from './Styles';

interface IConfirmDeleteProps {
  setAuthStateAction:   (authToken: string) => ((dispatch: Dispatch) => void);
}

interface IConfirmDeleteState {
  activeStep: number;
}

type ConfirmDeleteProps = IConfirmDeleteProps & IConfirmDeleteStyle;
type ConfirmDeleteState = {} & IConfirmDeleteState;
 
export { ConfirmDeleteProps, ConfirmDeleteState };