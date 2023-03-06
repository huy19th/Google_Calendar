import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Drawer from "../components/layout/Drawer";

export default function Home() {

    return (
        <Box sx={{display: "flex"}}>
            <Drawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );

}