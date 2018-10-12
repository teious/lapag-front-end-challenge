import { DateTime } from "luxon";

export interface ScheduleState {
    selectedDate: DateTime
    schedules: any[];
}