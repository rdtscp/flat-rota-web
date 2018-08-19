/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
import Button                                         from '@material-ui/core/Button';
import Chip                                           from '@material-ui/core/Chip';
import ExpansionPanel                                 from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails                          from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary                          from '@material-ui/core/ExpansionPanelSummary';
// import List                                           from '@material-ui/core/List';
// import ListItem                                       from '@material-ui/core/ListItem';
// import ListItemText                                   from '@material-ui/core/ListItemText';
// import Paper                                          from '@material-ui/core/Paper';
import Typography                                     from '@material-ui/core/Typography';

import * as Icons                                     from '@material-ui/icons';

/* This Project */
import * as Models                                    from "src/Models";

/* This Component */
import { FlatProps, FlatState }                       from './Types';

class Flat extends React.Component<FlatProps, FlatState> {

  public render() {
    const { classes } = this.props;
    const thisFlat: Models.Flat = this.props.flat;
    return (
      <div className={classes.flatContainer}>
        <div style={{ width: '100%' }}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
              <Typography variant="title"> Flat Members </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {thisFlat.members.map((member, index) =>
                    <Chip key={index} label={member.username} className={classes.chip} color="primary" />
                )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Button variant="fab" className={classes.fab} color="primary" onClick={this.createItem} >
            <Icons.Add />
          </Button>
        </div>
      </div>
    );
  }

  private createItem = (event: React.MouseEvent<HTMLElement>) => {
    alert('Popup to create new Item for Flat: ' + this.props.flat.id);
    // Models.FlatAPI.create()
  }

}

export default Flat;