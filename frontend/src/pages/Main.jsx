import { Grid, Box } from "@mui/material";
import Calendar from "../components/features/event/Calendar";

export default function Main() {

    return (
        <Grid container spacing={2} flexDirection="row-reverse">
            <Grid item component="main" xs={12} md={8}>
                <Box sx={{ maxWidth: "700px" }}>
                    <Calendar />
                </Box>
            </Grid>
            <Grid item component="aside" xs={12} md={4}>
                <h1>Event list</h1>
            </Grid>
        </Grid>
    );

}