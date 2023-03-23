import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ScreeningForm from "./ScreeningForm";

export default function ScreeningDialog({screening, editScreeningOpen, setEditScreeningOpen,}) {
  const handleClose = () => {
    setEditScreeningOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={editScreeningOpen} onClose={handleClose}>
      <DialogTitle width={{ width: "500px" }}>Edit Screening</DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill the form bellow.</DialogContentText>
      </DialogContent>
      <ScreeningForm screening={screening}></ScreeningForm>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
