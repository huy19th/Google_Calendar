import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

export default function BasicTable({setOpen, setUser}) {

    const users = useSelector(state => state.user.users);
    const [data, setData] = useState(users);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((item, index) => (
                        <TableRow
                            key={item._id}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="table-row"
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left">{item.username}</TableCell>
                            <TableCell align="left">{item.email}</TableCell>
                            <TableCell align="left">{item.role}</TableCell>
                            <TableCell align="center">
                                <EditIcon className="table-row-action" sx={{visibility: "hidden"}}
                                    onClick={() => {
                                        setUser(item);
                                        setOpen(true);
                                    }}
                                />
                                <DeleteIcon className="table-row-action" sx={{visibility: "hidden"}} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}