/* Components/AppNavigator/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import DrawerHeader                                   from './DrawerHeader';
import { drawerHeaderClasses }                        from './Styles';

const mapStateToProps = (state: Models.StateType) => {
  return {
    currentUser:  state.currentUser,
  }
}

export default connect(mapStateToProps, {})(withStyles(drawerHeaderClasses, {withTheme: true})(DrawerHeader));