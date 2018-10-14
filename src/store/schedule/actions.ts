import { Action } from "redux";
import { DateTime } from "luxon";
import { Schedule } from "src/utils/types";

export enum ScheduleActionTypes {
  UPDATE_DATE = "[schedule] update schedule view date",
  ADD_SCHEDULE = "[schedule] add schedule",
  REMOVE_SCHEDULE = "[schedule] remove schedule"
}

export class UpdateDate implements Action {
  readonly type = ScheduleActionTypes.UPDATE_DATE;
  constructor(public payload: DateTime) {}
}

export class AddSchedule implements Action {
  readonly type = ScheduleActionTypes.ADD_SCHEDULE;
  constructor(public payload: Schedule) {
    this.payload._id = DateTime.local().toISO();
  }
}

export class RemoveSchedule implements Action {
  readonly type = ScheduleActionTypes.REMOVE_SCHEDULE;
  constructor(public payload: string) {}
}

export type ScheduleAction = UpdateDate | AddSchedule | RemoveSchedule;
