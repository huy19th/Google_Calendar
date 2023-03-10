import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Grid } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import * as Yup from 'yup';
import eventService from "../../../services/event.service";
import { showSnackbar } from "../../../store/snackbar.slice";

export default function AddEventDialog({ open, setOpen }) {

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      start: new Date(),
      end: new Date(),
      allDay: false,
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
      let { allDay, startDate, endDate, startTime, endTime } = values
      let { $y, $M, $D } = startDate;
      var { $H, $m } = startTime;
      values.start = allDay ? new Date($y, $M, $D) : new Date($y, $M, $D, $H, $m);
      var { $H, $m } = endTime;
      values.end = allDay ? new Date($y, $M, $D, $H, $m) : endDate.$d;
      try {
        let message = (await eventService.createEvent(values)).data.message;
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
      sx={{ padding: 2 }}
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
          <TextField type="text" id="location" placeholder="Event's location" fullWidth
            sx={{ mb: 2 }}
            {...formik.getFieldProps('location')}
          />
          <TextField type="text" id="description" name="description" placeholder="Description" rows={3} multiline fullWidth
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