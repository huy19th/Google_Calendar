import { Grid, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import UserTable from "../components/features/user/UserTable";
import AddButton from "../components/ui/AddButton";
import { useState } from "react";

export default function Users() {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <Grid container>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} width="100%" marginBottom={2}>
                <Typography variant="h6" display={"inline-block"}>
                    Accounts
                </Typography>
                <AddButton onClick={() => { setShowDialog(true) }} />
            </Stack>
            <UserTable />
        </Grid>
    );

}

export { Users }