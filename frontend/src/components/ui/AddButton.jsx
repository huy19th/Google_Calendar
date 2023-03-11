import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton(props) {

    return (
        <Button variant="contained" startIcon={<AddIcon />} {...props}>
            Add
        </Button>
    )

}