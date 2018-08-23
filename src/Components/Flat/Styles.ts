/* Components/SettingsMenu/ConfirmDelete/index.ts */  //

/* MAterial-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const flatClasses = (theme: Theme) => createStyles({
  activeDevice: {
    ...theme.typography.button,
    color:  'green',
  },
  card: {
    display: 'flex',
    margin: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  closeSnackbar: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  fab: { 
    bottom: theme.spacing.unit * 4,
    position: 'fixed',
    right: theme.spacing.unit * 4,
  },
  flatContainer: {
    alignItems:       'center',
    display:          'flex',
    justifyContent:   'center',
  },
  itemControls: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
  },
  itemText: {
    flex: '1 0 auto',
    paddingRight: 8,
    width: 166
  },
  loadingContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  root: {
    ...theme.mixins.gutters(),
    borderRadius: 0,
    maxWidth: 355,
    minWidth: 327,
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  },
});

interface IFlatStyle extends WithStyles<typeof flatClasses> {};

export { flatClasses, IFlatStyle };