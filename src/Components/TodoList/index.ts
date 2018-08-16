/* Components/SettingsMenu/DeviceList/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
import * as Models                                    from 'src/Models';
import { setAuthStateAction }                         from 'src/State/Actions/authActions';
import { setCurrentUserAction }                       from 'src/State/Actions/userActions';

/* This Component */
import { todoListClasses }                            from './Styles';
import TodoList                                       from './TodoList';

const mapStateToProps = (state: Models.StateType) => {
  return {
    authState:  state.authState,
    devices:    state.currentUser.devices,
  }
}

export default connect(mapStateToProps, { setAuthStateAction, setCurrentUserAction })(withStyles(todoListClasses)(TodoList));