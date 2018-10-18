import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '../components/button';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  textarea: {
     width:'100%',
  },
  card: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
         <input
           accept="image/*"
           id="outlined-button-file"
           onChange={props.onChange}
           type="file"
           style={{paddingBottom:20}}
         />
         { props.imageURL &&
            <Card className={classes.card}>
               <CardMedia
                  alt="Image"
                  className={classes.media}
                  image={props.imageURL} />
            </Card>
         }
        <TextField className={classes.textarea}
            id="filled-multiline-flexible"
            multiline
            InputProps={{
               readOnly: true,
            }}
            rows="10"
            rowsMax="10"
            margin="normal"
            variant="filled"
            value={props.textfield}
       />
       <Button onClick={props.btnClick} color="primary" label={props.btnLabel}/>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
