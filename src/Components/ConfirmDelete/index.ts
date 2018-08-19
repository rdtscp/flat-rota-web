/* Components/SettingsMenu/ConfirmDelete/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Project */
// import * as Models                                    from 'src/Models';
import { setAuthStateAction }                         from 'src/Redux/Actions/authActions';

/* This Component */
import ConfirmDelete                                  from './ConfirmDelete';
import { confirmDeleteClasses }                       from './Styles';

export default connect(null, { setAuthStateAction })(withStyles(confirmDeleteClasses)(ConfirmDelete));
