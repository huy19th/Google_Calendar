import DateUtil from "./date.util";

export default class EventUtil {

    static filterEventThisOrNextMonth(events, isNextMonth) {
        let today = new Date();
        let month = today.getMonth() + Number(isNextMonth);
        let year = today.getFullYear();
        return events.filter(item => {
            return DateUtil.stringToDate(item.start).getMonth() === month && DateUtil.stringToDate(item.start).getFullYear() === year;
        });
    }

}

export const { filterEventThisOrNextMonth } = EventUtil;