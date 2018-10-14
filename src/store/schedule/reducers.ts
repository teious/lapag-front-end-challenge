import { Reducer } from "redux";
import { ScheduleState } from "./types";
import { DateTime } from "luxon";
import { ScheduleAction, ScheduleActionTypes } from "./actions";

const initialState: ScheduleState = {
  selectedDate: DateTime.local(),
  schedules: []
};
export const scheduleReducer: Reducer<ScheduleState> = (state = initialState,  action: ScheduleAction) => {

  switch (action.type) {
    case ScheduleActionTypes.UPDATE_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };
    case ScheduleActionTypes.ADD_SCHEDULE:
      return {
        ...state,
        schedules: [...state.schedules, action.payload]
      };
    case ScheduleActionTypes.REMOVE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.filter(sch => sch._id !== action.payload)
      };
    default:
      return state;
  }
  
};
