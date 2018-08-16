/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
// import Button                                         from '@material-ui/core/Button';
import Paper                                          from '@material-ui/core/Paper';
import Typography                                     from '@material-ui/core/Typography';

/* This Project */
import * as Models                                    from "src/Models";

/* This Component */
import { FlatProps, FlatState }                       from './Types';

class Flat extends React.Component<FlatProps, FlatState> {

  public render() {
    const { classes } = this.props;
    const thisFlat: Models.Flat = this.props.flat;
    return (
      <Paper className={classes.root} elevation={5}>
        <Typography variant="title" >
          {thisFlat.name}
        </Typography>
      </Paper>
    );
  }

}

export default Flat;