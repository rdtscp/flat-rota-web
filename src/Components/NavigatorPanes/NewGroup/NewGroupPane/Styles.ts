/* Components/AppNavigator/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';


const newGroupPaneClasses = (theme: Theme) => createStyles({
  button: {
    margin: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  closeSnackbar: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
  },
  container: {
    alignItems:     'center',
    display:        'flex',
    flexDirection:  'column',
    flexWrap:       'wrap',
    justifyContent: 'center',
    paddingTop:      24,
  },
  margin: {
    margin: theme.spacing.unit,
    width: 300,
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    marginTop:      10, 
    paddingBottom:  theme.spacing.unit * 2,
    paddingTop:     theme.spacing.unit * 2,
    width:          300,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

interface INewGroupPaneStyle extends WithStyles<typeof newGroupPaneClasses> {};

export { newGroupPaneClasses, INewGroupPaneStyle };