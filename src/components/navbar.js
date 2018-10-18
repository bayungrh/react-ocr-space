import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ImageSearch from '@material-ui/icons/ImageSearch';
import logo from '../logo.svg';
import '../App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">

        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <img src={logo} className="App-logo" alt="logo" />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Image OCR
          </Typography>
          <Button color="inherit" onClick={()=>window.open('https://github.com/MuhBayu')}>Fork</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
