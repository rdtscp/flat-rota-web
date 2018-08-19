/* Components/SettingsMenu/Device/index.ts */

/* React/Redux/Other */
import { connect }                                    from 'react-redux';

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

// /* This Project */
// import { setCurrentUserFlats }                        from 'src/Redux/Actions/userActions';

/* This Component */
import Item                                           from './Item';
import { itemClasses }                                from './Styles';

export default connect(null, { })(withStyles(itemClasses, {withTheme: true})(Item));