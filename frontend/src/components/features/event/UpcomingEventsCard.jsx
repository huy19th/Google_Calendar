import { Card, CardContent } from "@mui/material";
import { List, ListItemButton, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useSelector } from "react-redux";
import DateUtil from "../../../ultils/date.util";

function EventList({ title, events }) {
    const listStyles = { maxHeight: "50%", height: "50%", overflow: "auto" };

    return (
        <List sx={{ ...listStyles }}
            subheader={
                <ListItem>
                    <ListItemIcon>
                        <EventNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="h6">{title} ({events.length})</Typography>} />
                </ListItem>

            }>
            {
                events.map(item => (
                    <ListItemButton sx={{py: 0}}>
                        <ListItemText primary={item.title} secondary={DateUtil.displayEventTime(item.allDay, item.start, item.end)}/>
                    </ListItemButton>
                ))
            }
        </List>
    )
}

export default function UpcomingEventsCard() {

    const thisMonthEvents = useSelector(state => state.event.thisMonth);
    const nextMonthEvents = useSelector(state => state.event.nextMonth);

    const listStyles = { maxHeight: "345px", overflow: "auto" }

    return (
        <Card sx={{ height: "500px" }}>
            <CardContent>
                <EventList title="This Month" events={thisMonthEvents}/>
                <EventList title="Next Month" events={nextMonthEvents}/>
            </CardContent>
        </Card>
    );
}