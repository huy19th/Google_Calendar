import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton() {

    return (
        <Button variant="contained" startIcon={<AddIcon />}
        >
            Add
        </Button>
    )

}