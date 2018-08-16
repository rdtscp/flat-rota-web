/* Components/AppNavigator/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';


const todoPaneClasses = (theme: Theme) => createStyles({
});

interface ITodoPaneStyle extends WithStyles<typeof todoPaneClasses> {};

export { todoPaneClasses, ITodoPaneStyle };