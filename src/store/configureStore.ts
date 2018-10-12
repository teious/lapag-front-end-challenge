import {
  createStore,
  applyMiddleware,
  Store,
  AnyAction,
  Action,
  Dispatch
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppState, reducers } from "./";

export default function configureStore(
  initialState?: AppState
): Store<AppState> {
  const composeEnhancers = composeWithDevTools({});

  const store = createStore(
    reducers,
    initialState!,
    composeEnhancers(applyMiddleware())
  );

  const actionToPlainObject = (action: AnyAction) => ({ ...action });
  const next = store.dispatch;

  const dispatchPlain = (action: Action) => {
    const obj = actionToPlainObject(action);
    return next(obj);
  };
  store.dispatch = dispatchPlain as Dispatch<AnyAction>;

  return store;
}
