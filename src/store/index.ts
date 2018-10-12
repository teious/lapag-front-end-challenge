import { Dispatch, Action, combineReducers, Reducer, AnyAction } from "redux";
import { LayoutState } from "./layout/types";
import { layoutReducer } from "./layout/reducers";
import configureStore from "./configureStore";
import { ScheduleState } from "./schedule/types";
import { scheduleReducer } from "./schedule/reducers";

export interface AppState {
  layout: LayoutState;
  schedule: ScheduleState;
}

export const reducers: Reducer<AppState> = combineReducers({
  layout: layoutReducer,
  schedule: scheduleReducer
})

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

const store = configureStore();
export default store;



