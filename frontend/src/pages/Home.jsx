import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import NavBar from "../components/layout/NavBar";

export default function Home() {

    return (
        <Box>
            <NavBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );

}