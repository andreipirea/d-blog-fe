import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ConfimationDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Ești sigur că vrei să ștergi articolul?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dacă ștergi articolul acesta nu va mai putea fi recuperat!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.noAnswer}>
            Nu
          </Button>
          <Button onClick={props.yesAnswer} autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfimationDialog;
