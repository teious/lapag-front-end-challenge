import { Reducer } from "redux";
import { LayoutAction, LayoutActionTypes } from "./actions";
import { LayoutState } from "./types";


const initialState: LayoutState = {
  openedModal: false,
  modalContent: null
};

export const layoutReducer: Reducer<LayoutState> = (state = initialState, action: LayoutAction) => {
  switch (action.type) {
    case LayoutActionTypes.OPEN_MODAL:
      return {
        ...state,
        openedModal: true
      };
    case LayoutActionTypes.CLOSE_MODAL:
      return {
        ...state,
        openedModal: false
      };
    case LayoutActionTypes.UPDATE_MODAL_CONTENT:
      return {
        ...state,
        modalContent: action.payload
      }
    default:
      return state;
  }
};
