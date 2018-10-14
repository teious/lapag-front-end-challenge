import { DateTime } from "luxon";
import { Schedule } from "src/utils/types";

export interface ScheduleState {
    selectedDate: DateTime
    schedules: Schedule[];
}