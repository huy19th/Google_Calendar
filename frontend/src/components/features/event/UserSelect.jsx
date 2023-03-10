import { useState } from "react";
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from "@mui/material";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function UserSelect({ change }) {

    const users = useSelector(state => state.user.users);

    let userList = {};

    users.forEach(user => userList[user._id] = user.username);

    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event;
        setPersonName(
            typeof value === "string" ? value.split(",") : value,
        );
        change(value);
    };

    return (
        <div>
            <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="demo-multiple-chip-label">Participants</InputLabel>
                <Select
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Participants" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={userList[value]} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {users.map(user => (
                        <MenuItem
                            key={user.username}
                            value={user._id}
                        >
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}