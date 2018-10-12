import { Action } from "redux";

export enum LayoutActionTypes {
    OPEN_MODAL = "[layout] open modal",
    CLOSE_MODAL = "[layout] close modal",
    UPDATE_MODAL_CONTENT= '[layout] update modal content'
} 

export class OpenModal implements Action {
    readonly type = LayoutActionTypes.OPEN_MODAL;
}

export class CloseModal implements Action {
    readonly type = LayoutActionTypes.CLOSE_MODAL;
}

export class UpdateModalContent implements Action {
    readonly type = LayoutActionTypes.UPDATE_MODAL_CONTENT;
    constructor(public payload: () => JSX.Element){}
}
export type LayoutAction = OpenModal | CloseModal | UpdateModalContent;