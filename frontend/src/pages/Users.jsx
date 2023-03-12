import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import AddButton from "../components/ui/AddButton";
import UserTable from "../components/features/user/UserTable";
import SaveUserDialog from "../components/features/user/SaveUserDialog";


export default function Users() {

    const newUser = {
        _id: "",
        email: "",
        password: "",
        username: "",
        role: "user"
    }

    const [open, setOpen] = useState(false);

    const [user, setUser] = useState({...newUser});

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} width="100%" marginBottom={2}>
                <Typography variant="h6" display={"inline-block"}>
                    Accounts
                </Typography>
                <AddButton onClick={() => {
                    setUser({...newUser});
                    setOpen(true);
                }} />
            </Stack>
            <UserTable setOpen={setOpen} setUser={setUser} />
            <SaveUserDialog open={open} setOpen={setOpen} user={user} />
        </Box>
    );

}

export { Users }