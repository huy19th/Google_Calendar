import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import AddButton from "../components/ui/AddButton";
import UserTable from "../components/features/user/UserTable";
import SaveUserDialog from "../components/features/user/SaveUserDialog";


export default function Users() {

    const [open, setOpen] = useState(false);

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} width="100%" marginBottom={2}>
                <Typography variant="h6" display={"inline-block"}>
                    Accounts
                </Typography>
                <AddButton onClick={() => { setOpen(true) }} />
                <SaveUserDialog open={open} setOpen={setOpen} />
            </Stack>
            <UserTable />
        </Box>
    );

}

export { Users }