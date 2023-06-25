import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";
import CreateContact from "./CreateContact";
const APIURL = "http://localhost:3002/api/contacts/";
function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const fetchContacts = () => {
    axios
      .get(APIURL)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log("some error");
      });
  };

  const deleteContact = (id) => {
    axios
      .delete(APIURL + id)
      .then((res) => {
        //   setContacts(res.data);
        alert("Deleted successfully");
        fetchContacts();
      })
      .catch((err) => {
        console.log("some error");
      });
  };

  const updateContact = (id, name, number) => {
    axios.put(APIURL + id, { name, number }).then((resp) => {
      alert("Contact updated successfully");
      fetchContacts();
    });
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const addConatact = (name, number) => {
    axios.post(APIURL, { name, number }).then((resp) => {
      alert("Contact created succesfule");
      fetchContacts();
    });
  };

  return (
    <Card sx={{ justifyContent: "center", maxWidth: "360px" }}>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ p: 1, m: "auto" }}>
          Contacts
        </Typography>
        <CreateContact addContact={addConatact} />
      </Stack>
      {/* {contacts.map((contact) => (
        <MenuItem>{contact.name}</MenuItem>
      ))} */}
      <List
        sx={{ width: "100%", maxWidth: "360px", bgcolor: "background.paper" }}
      >
        {contacts.map((contact) => (
          <>
            <MenuItem>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText
                  primary={contact.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {contact.number}
                      </Typography>
                      {/* {" — I'll be in your neighborhood doing errands this…"} */}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {/* <Tooltip title="Edit contact">
                <IconButton aria-label="delete">
                  <EditIcon color="primary" tooltip="ereer" />
                </IconButton>
              </Tooltip> */}
              {/* <Tooltip title="Delete contact">
                <IconButton aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip> */}
              <EditContact contact={contact} updateContact={updateContact} />
              <DeleteContact deleteContact={() => deleteContact(contact.id)} />
              {/* <IconButton aria-label="delete">
                <MoreVertIcon color="primary" />
              </IconButton> */}
            </MenuItem>
            {/* <Divider variant="inset" component="li" /> */}
          </>
        ))}
      </List>
    </Card>
  );
}

export default ContactsPage;
