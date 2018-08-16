/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
import Chip                                           from '@material-ui/core/Chip';
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
        <Typography variant="title" style={{textAlign: 'center'}}>
          {thisFlat.name}
        </Typography>
        <Typography component="p">
          {thisFlat.members.map((member, index: number) => <Chip key={index} label={member.username} className={classes.chip} />)}
        </Typography>
      </Paper>
    );
  }

}

export default Flat;