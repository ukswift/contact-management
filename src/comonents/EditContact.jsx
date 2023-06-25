import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const APIURL = "http://localhost:3002/api/contacts/";

export default function EditContact({ contact, updateContact }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(contact && contact.name);
  const [number, setNumber] = React.useState(contact && contact.number);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit contact">
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the contact and confirm to save changes
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Number "
            type="text"
            fullWidth
            variant="standard"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => updateContact(contact.id, name, number)}
            variant="contained"
            color="success"
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
