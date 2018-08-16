/* Components/AppNavigator/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
import * as Models                                    from 'src/Models';
// import { setCurrentUserAction }                       from 'src/State/Actions/userActions';

/* This Component */
import FlatForm                                       from './FlatForm';
import { flatFormClasses }                            from './Styles';

const mapStateToProps = (state: Models.StateType) => {
  return {
    currentUser:  state.currentUser,
  }
}

export default connect(mapStateToProps, {})(withStyles(flatFormClasses, {withTheme: true})(FlatForm));