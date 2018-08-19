/* Components/SettingsMenu/ConfirmDelete/index.ts */  //

/* MAterial-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const itemClasses = (theme: Theme) => createStyles({
  card: {
    display: 'flex',
    margin: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemControls: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
  },
  itemText: {
    cursor: 'pointer',
    flex: '1 0 auto',
    paddingRight: 8,
    width: 166
  },
});

interface IItemStyle extends WithStyles<typeof itemClasses> {};

export { itemClasses, IItemStyle };