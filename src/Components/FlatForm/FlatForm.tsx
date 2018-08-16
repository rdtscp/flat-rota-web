/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import Button                                         from '@material-ui/core/Button';
import Chip                                           from '@material-ui/core/Chip';
import Fade                                           from '@material-ui/core/Fade';
import FormControl                                    from '@material-ui/core/FormControl';
import Icon                                           from '@material-ui/core/Icon';
import IconButton                                     from '@material-ui/core/IconButton';
import Input                                          from '@material-ui/core/Input';
import InputAdornment                                 from '@material-ui/core/InputAdornment';
import InputLabel                                     from '@material-ui/core/InputLabel';
import Paper                                          from '@material-ui/core/Paper';
import Snackbar                                       from '@material-ui/core/Snackbar';
import Typography                                     from '@material-ui/core/Typography';
import AddCircleIcon                                  from '@material-ui/icons/AddCircle';
import CloseIcon                                      from '@material-ui/icons/Close';


/* This Component */
import { FlatFormProps, FlatFormState }               from './Types';

export default class FlatForm extends React.Component<FlatFormProps, FlatFormState> {

  constructor(props: FlatFormProps) {
    super(props);
    this.state = {
      newGroupMembers:      [ `${this.props.currentUser.username}` ],
      newGroupName:         '',
      newGroupNameInvalid:  false,
      newGroupNewMember:    '',
      snackbarMessage:      '',
      snackbarOpen:         false,
    };
  }
  
  public render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate={true} autoComplete="off">
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="newGroupName">Flat Name</InputLabel>
            <Input
              id="newGroupName"
              type="text"
              required={true}
              error={this.state.newGroupNameInvalid}
              value={this.state.newGroupName}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="newGroupNewMember">Add Member</InputLabel>
            <Input
              id="newGroupNewMember"
              type="text"
              value={this.state.newGroupNewMember}
              onChange={this.handleChange}
              onKeyDown={this.handleAddMemberEnter}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Add member to group"
                    onClick={this.addMember}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Paper className={classes.paperRoot} elevation={1}>
            <Typography variant="subheading">
              Members
            </Typography>
            <div style={{ display: 'block' }}>
              {this.state.newGroupMembers.map((username: string, index: number) => { 
                if (username === this.props.currentUser.username) {
                  return (
                    <Chip
                      key={index}
                      label={username}
                      id={username}
                      className={classes.chip}
                      color="primary"
                    />
                  );
                } else {
                  return (
                    <Chip
                      key={index}
                      label={username}
                      id={username}
                      onDelete={this.removeUser}
                      className={classes.chip}
                      color="primary"
                    />
                  );
                }
                
              })}
            </div>
          </Paper>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.createFlatGroup}>
            Create Flat Group
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.hideSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          TransitionComponent={Fade}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.closeSnackbar}
              onClick={this.hideSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }

  private createFlatGroup = () => {
    if (this.state.newGroupName === '') {
      this.showSnackbar('Flat Name cannot be empty.');
      this.setState({
        newGroupNameInvalid: true,
      });
    }
    else {
      this.showSnackbar('Group Created!');
    }
  }

  private handleChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
      newGroupNameInvalid: (event.target.id !== 'newGroupName' && this.state.newGroupName === '') ? true : false,
    });
  };

  private handleAddMemberEnter = (event:any) => {
    if (event.keyCode === 13) {
      this.addMember();
    }
  };

  private addMember = () => {
    const newMembers = this.state.newGroupMembers;
    newMembers.push(this.state.newGroupNewMember)
    this.setState({
      newGroupMembers: newMembers,
      newGroupNewMember: '',
    });
  };

  private removeUser = (event: React.MouseEvent<HTMLElement>) => {
    const chipElement = event.currentTarget.parentElement;
    if (chipElement !== null && 'id' in chipElement) {
      const memberIndex: number = this.state.newGroupMembers.indexOf(chipElement.id);
      const newGroupMembers = [...this.state.newGroupMembers];
      newGroupMembers.splice(memberIndex, 1);
      this.setState({
        newGroupMembers,
      });
    }
  };

  private showSnackbar = (message: string) => {
    this.setState({
      snackbarMessage: message,
      snackbarOpen: true,
    });
  };

  private hideSnackbar = () => {
    this.setState({
      snackbarOpen: false
    });
  };

}