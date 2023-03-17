import { Dialog, DialogTitle, DialogContent, Icon } from "@mui/material";
import { Stack, Box, Typography, IconButton } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDeleteEventDialog from "./ConfirmDeleteEventDialog";
import EditEventDialog from "./EditEventDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import DateUtil from "../../../ultils/date.util";


export default function EventDetailDialog({ open, setOpen, event }) {

    const { role, _id } = useSelector(state => state.user.currentUser);

    const [openDelete, setOpenDelete] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}
            aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"
            maxWidth="xs" fullWidth
        >
            <DialogTitle variant="h4" id="alert-dialog-title">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant='h4'>
                        {event.title}
                    </Typography>
                    <Box>
                        {
                            role === "admin" || _id === event.creator ?
                                <>
                                    <IconButton onClick={() => { setOpenEdit(true) }}>
                                        <EditIcon />
                                    </IconButton>
                                    <EditEventDialog open={openEdit}
                                        closeDialog={() => { setOpenEdit(false) }}
                                        closeDetail={handleClose}
                                        event={event}
                                    />
                                    <IconButton onClick={() => setOpenDelete(true)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <ConfirmDeleteEventDialog open={openDelete}
                                        closeDialog={() => { setOpenDelete(false) }}
                                        closeDetail={handleClose}
                                        event={event}
                                    />
                                </>
                                : null
                        }
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText>
                            {event.start ? DateUtil.displayEventTime(event.allDay, event.start, event.end) : null}
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
        </Dialog>
    );
}