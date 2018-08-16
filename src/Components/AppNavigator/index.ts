/* Components/AppNavigator/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
import * as Models                                    from 'src/Models';
import { setCurrentUserAction, setCurrentUserFlats }  from 'src/State/Actions/userActions';

/* This Component */
import AppNavigator                                   from './AppNavigator';
import { appNavigatorClasses }                        from './Styles';

const mapStateToProps = (state: Models.StateType) => {
  return {
    authState:    state.authState,
    currentUser:  state.currentUser,
  }
}

export default connect(mapStateToProps, { setCurrentUserAction, setCurrentUserFlats })(withStyles(appNavigatorClasses, {withTheme: true})(AppNavigator));