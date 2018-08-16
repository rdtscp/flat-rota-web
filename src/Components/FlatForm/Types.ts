// /* React/Redux/Other */
// import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { IFlatFormStyle }                             from './Styles';

interface IFlatFormProps {
  currentUser:          Models.User;
}

interface IFlatFormState {
  newGroupMembers:      string[];
  newGroupName:         string;
  newGroupNameInvalid:  boolean
  newGroupNewMember:    string;
  snackbarMessage:      string;
  snackbarOpen:         boolean;
}

type FlatFormProps = IFlatFormProps & IFlatFormStyle;
type FlatFormState = IFlatFormState;

export { FlatFormProps, FlatFormState };