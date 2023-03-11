import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Backdrop from "../components/ui/Backdrop";
import Drawer from "../components/layout/Drawer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, setUsers } from "../store/user.slice";
import { setEvents } from "../store/event.slice";
import UserService from "../services/user.service";
import EventService from "../services/event.service";

export default function Home() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn && localStorage.getItem("token")) {
            async function getData() {
                try {
                    let user = (await UserService.getUserInfo()).data;
                    dispatch(login(user));
                    setLoading(false);
                    let users = (await UserService.getUserList()).data;
                    dispatch(setUsers(users));
                    let events = (await EventService.getEvents()).data;
                    dispatch(setEvents(events));
                }
                catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            }
            getData();
        }
        else setLoading(false);
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Backdrop />
    }
    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }
    return (
        <Box sx={{ display: "flex" }} >
            <Drawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box >
    )
    
}