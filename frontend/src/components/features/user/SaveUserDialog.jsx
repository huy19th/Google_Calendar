import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Divider } from "@mui/material"
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createUser, updateUser, getUserList } from '../../../services/user.service';
import { showSnackbar } from '../../../store/snackbar.slice';
import { setUsers } from '../../../store/user.slice';

export default function SaveUserDialog({ open, setOpen, user }) {

    const dispatch = useDispatch();

    const [values, setValues] = useState({ ...user });

    const [isValidated, setValidated] = useState(false);

    const validate = (values) => {
        if (!values.username || !values.email || !values.role || (!values._id && !values.password)) {
            return setValidated(false);
        }
        setValidated(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        validate({ ...values, [event.target.name]: event.target.value });
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let message = (user._id ? await updateUser(user._id, values) : await createUser(values)).data.message;
            dispatch(showSnackbar({
                severity: "success",
                message: message
            }))
            let users = (await getUserList()).data;
            dispatch(setUsers(users));
            handleClose();
        }
        catch (err) {
            dispatch(showSnackbar({
                severity: "error",
                message: err.response.statusText
            }))
        }
    }

    useEffect(() => {
        setValues({...user})
    }, [user])

    return (
        <Dialog fullWidth maxWidth="xs"
            open={open} onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle justifyContent="center" textAlign="center" variant="h4">
                    {user._id ? "User Info" : "Add User"}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField id="username" label="Username" type="text" size="small" margin="normal" autoFocus fullWidth
                        name="username" value={values.username} onChange={handleChange}
                    />
                    <FormControl margin="normal" size="small" fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Role"
                            name="role" value={values.role}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="email" label="Email" type="email" size="small" margin="normal" fullWidth
                        name="email" value={values.email} onChange={handleChange}
                    />
                    <TextField id="password" label="Password" type="password" size="small" margin="normal" fullWidth
                        name="password" value={values.password} onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit" disabled={isValidated}>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}