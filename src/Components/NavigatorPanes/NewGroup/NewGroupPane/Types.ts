// /* React/Redux/Other */
// import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { INewGroupPaneStyle }                         from './Styles';

interface INewGroupPaneProps {
  currentUser:          Models.User;
}

interface INewGroupPaneState {
  newGroupMembers:      string[];
  newGroupName:         string;
  newGroupNameInvalid:  boolean
  newGroupNewMember:    string;
  snackbarMessage:      string;
  snackbarOpen:         boolean;
}

type NewGroupPaneProps = INewGroupPaneProps & INewGroupPaneStyle;
type NewGroupPaneState = INewGroupPaneState;

export { NewGroupPaneProps, NewGroupPaneState };