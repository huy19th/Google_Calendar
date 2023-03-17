import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch } from 'react-redux';
import { deleteEvent, getEvents } from '../../../services/event.service';
import { setEvents } from '../../../store/event.slice';
import { showSnackbar } from '../../../store/snackbar.slice';

export default function ConfirmDeleteEventDialog({ open, closeDialog, closeDetail, event }) {

    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            let message = (await deleteEvent(event._id)).data.message;
            let events = (await getEvents()).data;
            closeDialog();
            closeDetail();
            dispatch(showSnackbar({
                serverity: "success",
                message: message
            }))
            dispatch(setEvents(events));
        }
        catch (err) {
            dispatch(showSnackbar({
                severity: "error",
                message: err.response.statusText
            }))
        }
    }

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete this event?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once you delete the event, it cannot be undone
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>No</Button>
                <Button onClick={handleDelete} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}