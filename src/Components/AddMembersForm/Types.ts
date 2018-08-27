/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { IAddMembersFormStyle }                       from './Styles';

interface IAddMembersFormProps {
  currentUser:          Models.User;
  cancel:               () => void;
  setCurrentUserAction: () => ((dispatch: Dispatch) => void);
  submit :              () => void;
}

interface IAddMembersFormState {
  formOpen:            boolean;
  newFlatMembers:      string[];
  newFlatName:         string;
  newFlatNameInvalid:  boolean
  newFlatNewMember:    string;
  snackbarMessage:     string;
  snackbarOpen:        boolean;
}

type AddMembersFormProps = IAddMembersFormProps & IAddMembersFormStyle;
type AddMembersFormState = IAddMembersFormState;

export { AddMembersFormProps, AddMembersFormState }