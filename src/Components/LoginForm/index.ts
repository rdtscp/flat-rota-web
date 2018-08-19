/* Components/LoginForm/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
import { setAuthStateAction }                         from 'src/Redux/Actions/authActions';
import { setCurrentUserAction }                       from 'src/Redux/Actions/userActions';

/* This Component */
import LoginForm                                      from './LoginForm';
import { loginFormClasses }                           from './Styles';

export default connect(null, { setAuthStateAction, setCurrentUserAction })(withStyles(loginFormClasses)(LoginForm));