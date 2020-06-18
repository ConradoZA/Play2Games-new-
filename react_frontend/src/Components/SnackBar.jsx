import React, { useState, useEffect } from "react";
import { Snackbar, Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const SnackBar = (props) => {
  const [open, setOpen] = useState(false);
  const TransitionDown = (props) => {
    return <Slide {...props} direction='down' />;
  };
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        TransitionComponent={TransitionDown}
        onClose={handleClose}>
        <Alert elevation={6} variant='filled' severity={props.type} onClose={handleClose}>
          {props.message}
        </Alert>
      </Snackbar>
  );
};

export default SnackBar;
