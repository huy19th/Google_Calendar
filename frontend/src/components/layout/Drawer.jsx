import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/user.slice";
import { setUsers } from "../../store/user.slice";
import { setEvents } from "../../store/event.slice";

const drawerWidth = 200;

const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
    }
}


export default function MiniDrawer() {

    const role = useSelector(state => state.user.currentUser.role);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        dispatch(setEvents([]));
        dispatch(setUsers([]));
    }

    const Navigation = [
        {
            text: "Events",
            link: "/",
            icon: <CalendarMonthIcon />
        },
        {
            text: "Accounts",
            link: "/users",
            icon: <PeopleAltIcon />
        },
        {
            text: "Profile",
            link: "/profile",
            icon: <AccountCircleIcon />
        }
    ]

    return (
        <Drawer variant="permanent" anchor="left" sx={drawerStyle}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <img src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_11_2x.png" alt="logo"
                            style={{ height: "50px", width: "50px" }}
                        />
                    </ListItemIcon>
                    <Typography variant="h5"
                        display="inline-block"
                        fontWeight={500}
                        sx={{ color: "#4285F4" }}>
                        Calendar
                    </Typography>
                </ListItem>
                <Divider />
                {Navigation.map((item) => {
                    if (role === "user" && item.text === "Accounts") {
                        return null;
                    }
                    return (
                        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                            <NavLink to={item.link} style={({ isActive }) => {
                                return {
                                    textDecoration: "none",
                                    backgroundColor: isActive ? "#F7F7F7" : null,
                                    color: "black",
                                    justifyContent: "initial",
                                    display: "flex"
                                }
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: "initial",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: "center",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: 1 }} />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )
                })}
                <ListItem key="Logout" disablePadding sx={{ display: "block" }}
                    onClick={handleLogOut}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: "initial",
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 3,
                                justifyContent: "center",
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out" sx={{ opacity: 1 }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer >
    );
}