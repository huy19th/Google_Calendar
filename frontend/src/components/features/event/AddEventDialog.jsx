import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Grid } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { LocalizationProvider, DesktopDatePicker, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../../store/snackbar.slice";
import { setEvents } from "../../../store/event.slice";
import EventService from "../../../services/event.service";
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
      let { startDate, endDate, startTime, endTime, ...selectedValues } = values;
      let { $y, $M, $D } = startDate;
      let { $H, $m } = startTime;
      selectedValues.start = values.allDay ? new Date($y, $M, $D) : new Date($y, $M, $D, $H, $m);
      let { $H: endHour, $m: endMinute } = endTime;
      selectedValues.end = values.allDay ? endDate.$d : new Date($y, $M, $D, endHour, endMinute);
      // selectedValues.start = (values.allDay ? new Date($y, $M, $D) : new Date($y, $M, $D, $H, $m)).toUTCString();
      // let { $H: endHour, $m: endMinute } = endTime;
      // selectedValues.end = values.allDay ? endDate.$d : new Date($y, $M, $D, endHour, endMinute).toUTCString();
      console.log(selectedValues)
      try {
        let message = (await EventService.createEvent(selectedValues)).data.message;
        let events = (await EventService.getEvents()).data;
        handleClose();
        dispatch(setEvents(events));
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
            <Grid container alignItems="center" marginBottom={1}>
              <DesktopDatePicker sx={{ mr: 2, width: "50%" }}
                name="startDate"
                inputFormat="MM/DD/YYYY"
                value={dayjs(formik.values.startDate)}
                renderInput={(params) => <TextField  {...params} size="small" />}
                onChange={value => {
                  formik.setFieldValue("startDate", value);
                }}
              />
              {
                formik.values.allDay ?
                  <DesktopDatePicker
                    name="endDate"
                    inputFormat="DD/MM/YYYY"
                    minDate={dayjs(formik.values.startDate)}
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
          <Grid container alignItems="center" display="inline-flex" marginBottom={1}>
            <TextField type="text" id="location" label="Location" fullWidth
              sx={{ mr: 2, width: "75%" }}
              {...formik.getFieldProps('location')}
            />
            <FormControlLabel label="All day" control={
              <Checkbox checked={formik.values.allDay}
                sx={{ my: 2 }}
                onClick={() => { formik.setFieldValue("allDay", !formik.values.allDay) }}
              />
            }
            />
          </Grid>

          <UserSelect change={handleChangeSelectInput} />
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