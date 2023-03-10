import { useState } from "react";
import { Grid, Box, Stack } from "@mui/material";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Calendar from "../components/features/event/Calendar";
import AddEventDialog from "../components/features/event/AddEventDialog";

export default function Main() {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <Grid container spacing={2} flexDirection="row-reverse">
            <Grid item component="main" xs={12} md={8}>
                <Box sx={{ maxWidth: "700px" }}>
                    <Calendar />
                </Box>
            </Grid>
            <Grid item component="aside" xs={12} md={4}>
                <Stack direction="row" justifyContent="space-between" paddingX={3}>
                    <Typography variant="h6" display={"inline-block"}>
                        Events
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />}
                        onClick={() => { setShowDialog(true) }}
                    >
                        Add
                    </Button>
                    <AddEventDialog open={showDialog} setOpen={setShowDialog} />
                </Stack>
            </Grid>
        </Grid>
    );

}