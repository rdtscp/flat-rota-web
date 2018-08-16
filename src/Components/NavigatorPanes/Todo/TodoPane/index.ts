/* Components/AppNavigator/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
// import * as Models                                    from 'src/Models';
// import { setCurrentUserAction }                       from 'src/State/Actions/userActions';

/* This Component */
import { todoPaneClasses }                            from './Styles';
import TodoPane                                       from './TodoPane';

export default connect(null, {})(withStyles(todoPaneClasses, {withTheme: true})(TodoPane));