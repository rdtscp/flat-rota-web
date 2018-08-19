/* Components/SettingsMenu/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
import * as Models                                    from 'src/Models';
import { setAuthStateAction }                         from 'src/Redux/Actions/authActions';
import { setCurrentUserAction }                       from 'src/Redux/Actions/userActions';

/* This Component */
import SettingsMenu                                   from './SettingsMenu';
import { settingsMenuClasses }                        from './Styles';

const mapStateToProps = (state: Models.StateType) => {
  return {
    authState:  state.authState,
    devices:    state.currentUser.devices,
  }
}

export default connect(mapStateToProps, { setAuthStateAction, setCurrentUserAction })(withStyles(settingsMenuClasses)(SettingsMenu));
