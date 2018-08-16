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

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { FlatFormProps, FlatFormState }               from './Types';

export default class FlatForm extends React.Component<FlatFormProps, FlatFormState> {

  constructor(props: FlatFormProps) {
    super(props);
    this.state = {
      newFlatMembers:     [ `${this.props.currentUser.username}` ],
      newFlatName:        '',
      newFlatNameInvalid: false,
      newFlatNewMember:   '',
      snackbarMessage:    '',
      snackbarOpen:       false,
    };
  }
  
  public render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate={true} autoComplete="off">
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="newFlatName">Flat Name</InputLabel>
            <Input
              id="newFlatName"
              type="text"
              required={true}
              error={this.state.newFlatNameInvalid}
              value={this.state.newFlatName}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="newFlatNewMember">Add Member</InputLabel>
            <Input
              id="newFlatNewMember"
              type="text"
              value={this.state.newFlatNewMember}
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
              {this.state.newFlatMembers.map((username: string, index: number) => { 
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
                      onDelete={this.removeMember}
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
    if (this.state.newFlatName === '') {
      this.showSnackbar('Flat Name cannot be empty.');
      this.setState({
        newFlatNameInvalid: true,
      });
    }
    else {
      const { authState } = this.props;
      Models.FlatAPI.create(authState.authToken, this.state.newFlatName, this.state.newFlatMembers)
      .then((data: Models.FlatResponseData) => {
        this.showSnackbar(data.message);
        this.props.setCurrentUserAction(authState.authToken);
      })
      .catch(error => this.showSnackbar(error.message));
    }
  }

  private handleChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
      newFlatNameInvalid: (event.target.id !== 'newFlatName' && this.state.newFlatName === '') ? true : false,
    });
  };

  private handleAddMemberEnter = (event:any) => {
    if (event.keyCode === 13) {
      this.addMember();
    }
  };

  private addMember = () => {
    const newMembers = this.state.newFlatMembers;
    newMembers.push(this.state.newFlatNewMember)
    this.setState({
      newFlatMembers:     newMembers,
      newFlatNewMember:   '',
    });
  };

  private removeMember = (event: React.MouseEvent<HTMLElement>) => {
    const chipElement = event.currentTarget.parentElement;
    if (chipElement !== null && 'id' in chipElement) {
      const memberIndex: number = this.state.newFlatMembers.indexOf(chipElement.id);
      const newFlatMembers = [...this.state.newFlatMembers];
      newFlatMembers.splice(memberIndex, 1);
      this.setState({
        newFlatMembers,
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