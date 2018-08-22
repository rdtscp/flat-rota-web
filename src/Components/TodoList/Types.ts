/* Components/SettingsMenu/DeviceList/Types.ts */  //

/* React/Redux/Other */
// import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { ITodoListStyle }                             from './Styles';

interface ITodoListProps {
  currentUser:          Models.User;
  flats:                Models.Flat[];
}

interface ITodoListState {
  snackbarMessage:  string;
  snackbarOpen:     boolean;
}

type TodoListProps = ITodoListProps & ITodoListStyle;
type TodoListState = {} & ITodoListState

export { TodoListProps, TodoListState };