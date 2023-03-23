import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MovieForm from "./MovieForm";

export default function MovieDialog({ movie, editOpen, setEditOpen }) {
  const handleClose = () => {
    setEditOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={editOpen} onClose={handleClose}>
      <DialogTitle width={{ width: "500px" }}>Edit Movie</DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill the form bellow.</DialogContentText>
      </DialogContent>
      <MovieForm movie={movie}></MovieForm>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
