import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function NavBar() {

    let activeStyle = {
        textDecoration: "underline",
        color: "white"
    };

    let inactiveStyle = {
        textDecoration: "none",
        color: "white"
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <CalendarMonthIcon fontSize="large" sx={{mr: 6}}/>
                <NavLink to="/"
                    style={({ isActive }) => isActive ? activeStyle : inactiveStyle}
                >
                    <Typography variant="h6" sx={{mr: 3}}>
                        Calendar
                    </Typography>
                </NavLink>
                <NavLink to="/users"
                    style={({ isActive }) => isActive ? activeStyle : inactiveStyle}
                >
                    <Typography variant="h6">
                        Users
                    </Typography>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}