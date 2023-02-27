import { Grid } from "@mui/material";
import { Card, CardContent, CardActions } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: values => {
            console.log(values)
        },
    });
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center"
            sx={{ height: "80vh" }}
        >
            <Card variant="elevation" sx={{ width: "400px", p: 2, boxShadow: "0 4px 8px 0" }}>
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
    )
}

export default Login;