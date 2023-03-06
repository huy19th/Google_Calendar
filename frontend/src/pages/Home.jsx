import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import NavBar from "../components/layout/NavBar";
import Drawer from "../components/layout/Drawer";
import { DrawerHeader } from "../components/layout/Drawer";

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