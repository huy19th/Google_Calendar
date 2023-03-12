import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../../store/snackbar.slice";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const { show, severity, message } = useSelector(state => state.snackbar);

    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(closeSnackbar());
    };

    return (
        <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}