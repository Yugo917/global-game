import { IActionMenuItem } from "../../../navigation/ActionsMenu";

interface IRowActionMenuBase<T> {
  rowData: T;
  anchorEl: null | HTMLElement;
  onMenuClose: () => void;
}

export interface IRowActionMenu<T> extends IRowActionMenuBase<T> {
  onActionClicked: (actionId: string, rowData: T) => void;
}

export interface IRowActionMenuAsync<T> extends IRowActionMenuBase<T> {
  onActionStart?: (actionId: string, rowData: T) => void;
  onActionError: (actionId: string, rowData: T, errorMessage: string) => void;
  onActionSuccess: (actionId: string, rowData: T, successMessage?: string) => void;
}

export interface ISimpleRowActionMenu<T> extends IRowActionMenuBase<T> {
  actions: IActionMenuItem[];
}
