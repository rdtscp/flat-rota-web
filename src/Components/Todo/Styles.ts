/* Components/AppNavigator/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';


const todoClasses = (theme: Theme) => createStyles({
});

interface ITodoStyle extends WithStyles<typeof todoClasses> {};

export { todoClasses, ITodoStyle };