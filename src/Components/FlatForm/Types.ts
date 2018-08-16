// /* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { IFlatFormStyle }                             from './Styles';

interface IFlatFormProps {
  authState:            Models.AuthStateType;
  currentUser:          Models.User;
  setCurrentUserAction: (authToken: string) => ((dispatch: Dispatch) => void);
}

interface IFlatFormState {
  newFlatMembers:      string[];
  newFlatName:         string;
  newFlatNameInvalid:  boolean
  newFlatNewMember:    string;
  snackbarMessage:     string;
  snackbarOpen:        boolean;
}

type FlatFormProps = IFlatFormProps & IFlatFormStyle;
type FlatFormState = IFlatFormState;

export { FlatFormProps, FlatFormState };