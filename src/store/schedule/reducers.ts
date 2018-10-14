import { Reducer } from "redux";
import { ScheduleState } from "./types";
import { DateTime, Duration } from "luxon";
import { ScheduleAction, ScheduleActionTypes } from "./actions";

const initialState: ScheduleState = {
  selectedDate: DateTime.local(),
  schedules: [ {
    customer: {
      _id: '43E5xJsZxpnrbo38',
      name: 'Adriana Pestre Vieira Young Tolomes'
    },
    professional: {
     // value: '11158031076',
     // label: 'Ana',
      _id: '4b6BEEvCCH8zAGSyY',
      name: 'Ana Claudia Silveira',
      nickname: 'Ana',
      document_number: '11158031076'
    },
    startTime: DateTime.fromISO('2018-10-14T08:30:28.764-03:00'),
    services: [
      {
       // value: 'bjmmPPjqKdWfwJqtC',
       // label: 'Pedicure',
        _id: 'bjmmPPjqKdWfwJqtC',
        name: 'Pedicure',
        duration: '90',
        available_professionals: [
          {
            commission: '53',
            cpf: '11158031076'
          },
          {
            commission: '50',
            cpf: '82053478837'
          },
          {
            cpf: '45810281820',
            commission: '50'
          }
        ]
      },
      {
       // value: 'cYzRrK8SM8SZr6LiG',
      //  label: 'Francesinha',
        _id: 'cYzRrK8SM8SZr6LiG',
        name: 'Francesinha',
        duration: '30',
        available_professionals: [
          {
            commission: '50',
            cpf: '11158031076'
          },
          {
            commission: '50',
            cpf: '82053478837'
          },
          {
            cpf: '45810281820',
            commission: '50'
          }
        ]
      }
    ],
    duration: {
      label: '1h15m',
      value: Duration.fromObject({minutes:105})

    },
    _id: '2018-10-14T15:57:10.112-03:00'
  }]
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
