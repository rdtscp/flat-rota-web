/* Components/SettingsMenu/DeviceList/Types.ts */  //

/* React/Redux/Other */
// import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { ITodoListStyle }                             from './Styles';

interface ITodoListProps {
  devices:              Models.Device[];
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