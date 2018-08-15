/* Components/SettingsMenu/ConfirmDelete.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import Button                                         from '@material-ui/core/Button';
import Paper                                          from '@material-ui/core/Paper';
import Step                                           from '@material-ui/core/Step';
import StepContent                                    from '@material-ui/core/StepContent';
import StepLabel                                      from '@material-ui/core/StepLabel';
import Stepper                                        from '@material-ui/core/Stepper';
import Typography                                     from '@material-ui/core/Typography';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { ConfirmDeleteProps, ConfirmDeleteState }     from './Types';

class ConfirmDelete extends React.Component<ConfirmDeleteProps, ConfirmDeleteState> {

  constructor(props: ConfirmDeleteProps) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  public render() {

    const { classes }     = this.props;
    const steps           = ['Begin Deleting Account', 'What You Will Lose', 'Final Chance'];
    const { activeStep }  = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{this.getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Next' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square={true} elevation={0} className={classes.resetContainer}>
            <Button onClick={this.deleteAccount} className={classes.button} color="secondary">
              Delete Account
            </Button>
          </Paper>
        )}
      </div>
    );
  }

  private deleteAccount = () => {
    const localAuthToken: string = this.props.authState.authToken;
    Models.UserAPI.destroy(localAuthToken)
    .then((data: Models.UserResponseData) => {
      this.props.setAuthStateAction(localAuthToken);
    })
    .catch((data: Models.UserResponseData) => {
      alert(data.message);
      this.props.setAuthStateAction(localAuthToken);
    })
  }

  private handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  private handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  private getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return `Click 'Next' to begin deleting your account.`;
      case 1:
        return 'Are you sure you want to delete your account. Deleting your account is permanent, it cannot be undone. All your data will be deleted and unrecoverable.';
      case 2:
        return `Last Chance`;
      default:
        return 'Unknown step';
    }
  }

}

export default ConfirmDelete;