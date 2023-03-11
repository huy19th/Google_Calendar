import { Grid } from "@mui/material";
import { Card, CardContent, CardActions } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventService from "../services/event.service";
import { showSnackbar } from "../store/snackbar.slice";
import { login, setUsers } from "../store/user.slice";
import { setEvents } from "../store/event.slice";

function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: async values => {
            try {
                let { token, user } = (await AuthService.login(values)).data;
                localStorage.setItem("token", token);
                dispatch(login(user));
                let users = (await UserService.getUserList()).data;
                dispatch(setUsers(users));
                let events = (await EventService.getEvents()).data;
                dispatch(setEvents(events));
                navigate("/home");
            }
            catch (err) {
                console.log(err.message)
                dispatch(showSnackbar({
                    severity: "error",
                    message: err.response.statusText
                }))
            }
        },
    });

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center"
            sx={{ height: "80vh" }}
        >
            <Grid item xs={4}>
                <Card variant="elevation" sx={{ p: 2 }} raised={true}>
                    <form onSubmit={formik.handleSubmit}>
                        <CardContent>
                            <Typography variant="h3" align="center" mb={4}>
                                Login
                            </Typography>
                            <TextField id="email" type="email" label="Email" variant="outlined" fullWidth sx={{ mb: 4 }}
                                {...formik.getFieldProps('email')}
                            />
                            <TextField id="password" type="password" label="Password" variant="outlined" fullWidth sx={{ mb: 2 }}
                                {...formik.getFieldProps('password')}
                            />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" fullWidth type="submit"
                                sx={{ mx: 1, mb: 2, height: "50px" }}
                            >
                                Login
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login;