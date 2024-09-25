import { ButtonModel } from "./button.model";

export interface ConfirmDialogModel {
  title?: string;
  content?: string;
  buttons?: ButtonModel[];
  mode?:string,
  data?:any;
  featute?:string;
  subtitle?:string;
  dataOption?: any;
}
