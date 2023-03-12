import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SaveUserDialog({ open, setOpen }) {

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required(),
            password: Yup.string().required(),
            username: Yup.string().required()
        }),
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField autoFocus id="email" label="Email" type="email" margin="normal" fullWidth
                        {...formik.getFieldProps("email")}
                    />
                    <TextField id="password" label="Password" type="password" margin="normal" fullWidth
                        {...formik.getFieldProps("password")}
                    />
                    <TextField id="username" label="Username" type="text" margin="normal" fullWidth
                        {...formik.getFieldProps("username")}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit" onClick={handleClose}>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}