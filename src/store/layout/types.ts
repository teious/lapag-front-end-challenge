export interface LayoutState {
    openedModal:  boolean;
    modalContent: (() => JSX.Element) | null;
}