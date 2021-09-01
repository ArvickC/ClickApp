import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = theme => ({
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Roboto",
  },
  textFieldColor: {
    color: 'white'
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      open: localStorage.name===undefined ? true : false,
      changeUsername: localStorage.name===undefined ? "" : localStorage.name,
      username: localStorage.name===undefined ? "" : localStorage.name
    }
  }

  handleClick = () => {
    this.setState({open: true})
  }

  handleClickOpen = () => {
    this.setState({open: true})
  };

  handleCloseSave = () => {
    if(this.state.changeUsername.trim() === "") {
      this.setState({
        changeUsername: ""
      })
      return;
    }
    this.setState({
      open: false,
      username: this.state.changeUsername
    })
    localStorage.name = this.state.changeUsername;
  };

  handleCloseCancel = () => {
    this.setState({
      open: false,
      changeUsername: this.state.username
    })
  }

  handleCloseClear = () => {
    this.setState({
      open: false,
      changeUsername: "",
      username: ""
    })
    if(localStorage.name!=undefined) {
      localStorage.removeItem("name")
    }
  }

  handelChange = (e) => {
    this.setState({changeUsername: e.target.value})
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary" >
            <Toolbar variant="dense">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h5" color="inherit" className={classes.title}>
                    Click Test
                </Typography>
                <Button color="inherit" onClick={this.handleClick}>{localStorage.name===undefined ? "Set Name" : localStorage.name}</Button>
            </Toolbar>
        </AppBar>
        
        <div>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" PaperProps={{style: {backgroundColor: "#383838"}}}>
            <DialogTitle id="form-dialog-title" style={{color: 'white'}}>Set Username</DialogTitle>
            <DialogContent>
              <DialogContentText style={{color: 'white'}}>
                This username will show on scoreboards.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                value={this.state.changeUsername}
                onChange={this.handelChange}
                InputProps={{
                  classes: {
                    input: classes.textFieldColor
                  }
                }}
                InputLabelProps={{
                  style: {color: 'white'}
                }}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseCancel} style={{color: 'white'}}>
                Cancel
              </Button>
              <Button onClick={this.handleCloseClear} style={{color: 'white'}}>
                Clear
              </Button>
              <Button onClick={this.handleCloseSave} style={{color: 'white'}}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Header)
