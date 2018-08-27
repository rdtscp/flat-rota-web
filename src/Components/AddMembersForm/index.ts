/* Components/LoginForm/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
import * as Models                                    from 'src/Models';
import { setCurrentUserAction }                       from 'src/Redux/Actions/userActions';

/* This Component */
import AddMembersForm                                 from './AddMembersForm';
import { addMembersFormClasses }                      from './Styles';

const mapStateToProps = (state: Models.StateType) => {
  return {
    authState:    state.authState,
    currentUser:  state.currentUser,
  }
}

export default connect(mapStateToProps, { setCurrentUserAction })(withStyles(addMembersFormClasses)(AddMembersForm));