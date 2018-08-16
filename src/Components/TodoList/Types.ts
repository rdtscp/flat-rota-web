/* Components/SettingsMenu/DeviceList/Types.ts */  //

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { ITodoListStyle }                             from './Styles';

interface ITodoListProps {
  authState:            Models.AuthStateType;
  devices:              Models.Device[];
  setAuthStateAction:   (authToken: string) => ((dispatch: Dispatch) => void);
  setCurrentUserAction: (authToken: string) => ((dispatch: Dispatch) => void);
}

interface ITodoListState {
  confirmationAlertOpen:    boolean;
  confirmationSnackbarOpen: boolean;
  deviceToLogoutAuthToken:  string;
  deviceToLogoutID:         string;
  deviceToLogoutString:     string;
}

type TodoListProps = ITodoListProps & ITodoListStyle;
type TodoListState = {} & ITodoListState

export { TodoListProps, TodoListState };