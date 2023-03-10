import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Grid } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../../store/snackbar.slice";
import eventService from "../../../services/event.service";
import UserSelect from "./UserSelect";

export default function AddEventDialog({ open, setOpen }) {

  const user = useSelector(state => state.user.currentUser);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSelectInput = (values) => {
    formik.setFieldValue("participants", values)
  }

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      creator: user._id,
      start: new Date(),
      end: new Date(),
      allDay: false,
      participants: [],
      location: '',
      description: '',
      startDate: dayjs(new Date()),
      endDate: dayjs(new Date()),
      startTime: dayjs(new Date()),
      endTime: dayjs(new Date())
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      start: Yup.date().required(),
      end: Yup.date().required(),
      allDay: Yup.boolean(),
      location: Yup.string(),
      description: Yup.string(),
    }),
    onSubmit: async values => {
      let { startDate, endDate, startTime, endTime, ...selectedValues } = values
      let { $y, $M, $D } = startDate;
      var { $H, $m } = startTime;
      selectedValues.start = values.allDay ? new Date($y, $M, $D) : new Date($y, $M, $D, $H, $m);
      var { $H, $m } = endTime;
      selectedValues.end = values.allDay ? new Date($y, $M, $D, $H, $m) : endDate.$d;
        try {
          let message = (await eventService.createEvent(selectedValues)).data.message;
          dispatch(showSnackbar({
            severity: "success",
            message: message
          }));
        }
        catch (err) {
          dispatch(showSnackbar({
            severity: "error",
            message: err.response.statusText
          }));
        }
    },
  });

  return (
    <Dialog fullWidth={true} maxWidth="sm"
      open={open} onClose={handleClose}
      sx={{ padding: 2, height: "100%" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField id="title" type="text" placeholder="Add event's title" variant="standard" fullWidth autoFocus={true}
            sx={{ mb: 4, lineHeight: "40px" }}
            inputProps={{ style: { fontSize: 30 } }}
            {...formik.getFieldProps('title')}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container alignItems="center">
              <DesktopDatePicker sx={{ mr: 2, width: "50%" }}
                name="startDate"
                inputFormat="MM/DD/YYYY"
                value={dayjs(formik.values.startDate)}
                onChange={value => {
                  formik.setFieldValue("startDate", value.$d);
                }}
              />
              {
                formik.values.allDay ?
                  <DesktopDatePicker
                    name="endDate"
                    inputFormat="DD/MM/YYYY"
                    value={dayjs(formik.values.endDate)}
                    onChange={value => {
                      formik.setFieldValue("endDate", value);
                    }}
                  />
                  :
                  <Grid container alignItems="center" display="inline-flex" sx={{ width: "45%" }}>
                    <TimePicker sx={{ width: "45%" }}
                      name="startTime"
                      value={formik.values.startTime}
                      onChange={value => {
                        formik.setFieldValue("startTime", value);
                      }} />
                    <RemoveIcon />
                    <TimePicker sx={{ width: "45%" }}
                      name="endTime"
                      value={formik.values.endTime}
                      onChange={value => {
                        formik.setFieldValue("endTime", value);
                      }}
                    />
                  </Grid>
              }
            </Grid>
          </LocalizationProvider>
          <FormControlLabel label="All day" control={
            <Checkbox checked={formik.values.allDay}
              sx={{ my: 2 }}
              onClick={() => { formik.setFieldValue("allDay", !formik.values.allDay) }}
            />
          }
          />
          <UserSelect change={handleChangeSelectInput} />
          <TextField type="text" id="location" label="Location" fullWidth
            sx={{ mb: 2 }}
            {...formik.getFieldProps('location')}
          />
          <TextField type="text" id="description" name="description" label="Description" rows={2} multiline fullWidth
            {...formik.getFieldProps('description')}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button variant="contained" type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}