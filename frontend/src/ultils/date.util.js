import moment from "moment";

export default class DateUtil {

    static displayEventTime(allDay, start, end) {
        if (allDay) {
            return this.displayAllDayEventTime(start, end);
        }
        return this.displayInDayEventTime(start, end);
    }

    static displayAllDayEventTime(start, end) {
        if (this.sameDay(start, end)) {
            return moment(start).format(start.getFullYear() === (new Date()).getFullYear() ? "dddd, MMMM D" : "dddd, MMMM YYYY");
        }
        return `${moment(start).format("MMMM DD")} - ${moment(start).format("DD, YYYY")}`;
    }

    static displayInDayEventTime(start, end) {
        return `${moment(start).format("dddd, MMMM DD")} ⋅ ${moment(start).format("hh:mm a")} - ${moment(end).format("hh:mm a")}`
    }

    static sameDay(day1, day2) {
        return day1.getFullYear() === day2.getFullYear() &&
            day1.getMonth() === day2.getMonth() &&
            day1.getDate() === day2.getDate();
    }

}