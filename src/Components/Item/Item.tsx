/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
import { Card, CardContent, IconButton, Typography
}                                                     from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';


/* This Component */
import { ItemProps, ItemState }                       from './Types';

class Flat extends React.Component<ItemProps, ItemState> {

  constructor(props: ItemProps) {
    super(props);
    this.state = {
      showName: true,
    };
  }

  public render() {
    const { classes, item } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.itemContainer}>
          <CardContent className={classes.itemText} onClick={this.toggleContent}>
            <Typography variant={(this.state.showName) ? "headline" : "subheading"}>{(this.state.showName) ? item.name : item.description}</Typography>
          </CardContent>
          <div className={classes.itemControls}>
            <IconButton aria-label="Mark Bought">
              <Icons.Done />
            </IconButton>
            <IconButton aria-label="Notify Runout">
              <Icons.NotificationsActive />
            </IconButton>
            <IconButton aria-label="Item Options">
              <Icons.MoreHoriz />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }

  private toggleContent = () => {
    this.setState({
      showName: !this.state.showName
    });
  }

}

export default Flat;