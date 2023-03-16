import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import moment from "moment";

export default function EventDetailDialog({ open, setOpen, event }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}
      aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"
      maxWidth="sm" fullWidth
    >
      <DialogTitle variant="h4" id="alert-dialog-title">
        {event.title}
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText>
              {event.allDay ?
                `${moment(event.start).format("MMMM DD")} - ${moment(event.start).format("DD, YYYY")}`
                : `${moment(event.start).format("dddd, MMMM DD")} ⋅ ${moment(event.start).format("hh:mm a")} - ${moment(event.end).format("hh:mm a")}`}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>
              {event.participants?.length + " participants"}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText>
              {event.location}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText>
              {event.description}
            </ListItemText>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose} autoFocus>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}