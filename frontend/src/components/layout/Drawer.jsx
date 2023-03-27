import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/user.slice";
import { setUsers } from "../../store/user.slice";
import { setEvents } from "../../store/event.slice";
import { revokeRefreshToken } from "../../services/auth.service";
import { removeTokens } from "../../ultils/cookie.util";

function DrawerItem({ text, icon, onClick }) {

    return (
        <ListItem key={text} disablePadding onClick={onClick}>
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
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: 1 }} />
            </ListItemButton>
        </ListItem>
    )
}

export default function MiniDrawer() {

    const drawerWidth = 200;

    const drawerStyle = {
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
        }
    }

    const role = useSelector(state => state.user.currentUser.role);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        try {
            revokeRefreshToken();
            removeTokens();
            dispatch(logout());
            dispatch(setEvents([]));
            dispatch(setUsers([]));
        }
        catch (err) {
            console.log(err)
        }
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
    ];

    const logOut = {
        text: "Logout",
        icon: <LogoutIcon />,
        onClick: () => { handleLogOut() }
    }

    return (
        <Drawer variant="permanent" anchor="left" sx={drawerStyle}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <img src={`https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${(new Date()).getDate()}_2x.png`} alt="logo"
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
                        <NavLink to={item.link} style={({ isActive }) => {
                            return {
                                textDecoration: "none",
                                backgroundColor: isActive ? "#F7F7F7" : null,
                                color: "black",
                            }
                        }}>
                            <DrawerItem {...item} />
                        </NavLink>
                    )
                })}
                <DrawerItem {...logOut} />
            </List>
        </Drawer >
    );
}