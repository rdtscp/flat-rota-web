/* Components/AppNavigator/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
// import * as Models                                    from 'src/Models';
// import { setCurrentUserAction }                       from 'src/Redux/Actions/userActions';

/* This Component */
import { todoClasses }                                from './Styles';
import Todo                                           from './Todo';

export default connect(null, {})(withStyles(todoClasses, {withTheme: true})(Todo));