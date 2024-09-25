import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface TypeVehicleModel {
  createdBy: number | string;
  createdDate: string;
  isActive: number | string;
  name: string;
  transportTypeId: number;
  updatedBy: number | string;
  abbreviation: string;
  transportMftDTOId: transportMftDTO | string;
}
export interface transportMftDTO {
  createdBy?: number | string;
  updatedBy?: number | string;
  isActive?: number | string;
  transportMftId?: number | string;
  name?: string;
  createdDate?: string;
}

export interface OptionModel {
  key: string | number;
  code?: string;
  value: string | number;
  hasChild?: boolean;
}
export interface OptionAccessoryModel {
  key: string | number;
  value: string | number;
  dayWarningBefore: number;
  kmWarningBefore: number;
  maintenanceKm: number;
  maintenanceMonth: number;
}

export interface BranchVehicleModel {
  name: string;
  description: string;
  createdDate: string;
  transportMftId: number;
  transportMftName: string;
}
export interface VehicleModel {
  registerNoDTO: string;
  transportId: number;
  transportTypeDTOId: string;
  groupsCodeDTO: string;
  groupsDTOId: string;
  deviceCode: string;
  provinceDTOId: string;
  districtDTOId: string;
  nameDTO: string;
  name: string;
  registerNo: string;
  hasSpeedDoMeter: number;
  displayName: number;
  usingType?: string;
  simDevice?: string;
  userName?: string
}
export interface DataVehicle {
  createdBy: string | number;
  createdDate: string;
  deviceCode: string;
  deviceTypeName: string;
  groupChildName: string;
  groupParentName: string;
  hasSpeedDoMeter: string | number;
  isNameDisplay: string | number;
  registerNo: string;
  transportId: number;
  transportName: string;
  transportType: string;
  usingType: string | number;
}
export interface TypeVehicleModel {
  abbreviation: string;
  createdDate: string;
  transportMftName: string;
  transportTypeId: number;
  transportTypeName: string;
}
export interface MaintainVehicle {
  accessoryId: string;
  description: string;
  price: string;
  kmWarningBefore: string;
  dayWarningBefore: string;
  maintenanceDate: string;
  maintenanceMonth: string;
  maintenanceKm: string;
}
export interface TransferTransportModel {
  registerNoList: [];
  transferFromCode: string;
  transferToCode: string;
  reason: string;
  transferredBy?: string | number;
  transferredDate: string;
}

export interface HistoryTransferTransport {
  stt?: string;
  transferBy?: string;
  transferFrom?: string;
  transferTo?: string;
  reason?: string;
  transferredDate?: string;
}
export interface MaintainTransportModel {
  accessoryMaintenanceDTOId: number | string;
  accessoryName: string;
  dayWarningBefore: number | string;
  description: string;
  kmWarningBefore: number | string;
  maintenanceDate: string;
  maintenanceKm: number | string;
  maintenanceMonth: number | string;
  price: null | string;
}
export interface DepositMoenyModel {
  devicePhoneNumber: string;
  registerNo: string;
  cardCode: string;
  captchaCode: string;
  sessionId: string;
  transportId?: number | string;
}
export interface TreeSelectModel {
  title: string;
  value: string;
  key: string;
  isLeaf: any;
  children: TreeSelectModel[];
}
export interface DataOriginTransport {
  stt?: string | number;
  registerNo?: string | number;
  gpsCreateDate?: string | number | any;
  gpsDirection?: string | number;
  gpsSpeed?: string | number;
  gpsState?: string | number;
  offPowerState?: string | number;
  lowBatteryState?: string | number;
  illegalMoveState?: string | number;
  vibrationState?: string | number;
}
export interface FlatNode {
  expandable: boolean;
  id: number;
  label: string;
  level: number;
  loading?: boolean;
}
export const SUCCESS = '200';
export const CAPTCHA_REQUIRED = '410';
export const CAPTCHA_WRONG = '411';
// regex check bien so xe
// export const REGEX_REGISTERNO = /(^([0-9]{2})([a-zA-Z]{1})([0-9]{1})([-]{1})([0-9]{4,5})+$)|(^([0-9]{2})([-]{1})([0-9]{3})([-]{1})([a-zA-Z]{2})+$)|(^([0-9]{2})([a-zA-Z]{2})([-]{1})([0-9]{4,5})+$)/

export const REGEX_MOTOR =
  /^([0-9]{2})([a-zA-Z]{1})([0-9]{1})([-]{1})([0-9]{4,5})$/;

export const REGEX_CAR =
  /(^([0-9]{2})([a-zA-Z]{1})([-]{1})([0-9]{4,5})$)|(^([0-9]{2})([a-zA-Z]{2})([-]{1})([0-9]{4,5})$)/;

export const REGEX_OTHER =
  /(?=.*\d)(?=.*[a-zA-Z])(([a-zA-Z0-9]{1,8})-([a-zA-Z0-9]{1,8}))/;

export const REGEX_LINK_YOUTUBE =
  /\b(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)\b/;

export const REGEX_LINK =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~\!@#\$%\^&\*\(\)_\-=\+\{\}\[\]\\\|;:'"\?\/><.,])[A-Za-z\d`~\!@#\$%\^&\*\(\)_\-=\+\{\}\[\]\\\|;:'"\?\/><.,]{0,}$/;

export const REGEX_PHONE = /^(0){1}(3|5|7|8|9)([0-9]{8})$/;
//     /^(([a-z0-9]+)|([a-z0-9]+[a-z0-9.\-\_]*[a-z0-9]+))@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/
export const REGEX_EMAIL = /^([a-zA-Z0-9]+)(([\.\-\_][a-zA-Z0-9]+)*)@[a-zA-Z0-9]+(\.[a-zA-Z]{2,6})+$/;

export const REGEX_FULLNAME = /^[^`~\!@#\$%\^&\*\(\)_\-=\+\{\}\[\]\\\|;:'"\?\/><.,]+$/;

export function handleChangeMoney(val: any) {
  let value = val.replace(/[,]/g, '');

  if (Number(value.replace(/[,]/g, ''))) {
    const money = Number(val.replace(/[^0-9]+/g, ''));
    if (!money) {
      return '0';
    }

    const moneyStr = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return moneyStr;
  } else {
    return val;
  }

  // const money = Number(val.replace(/[^0-9]+/g, ''));
  // if (!money) {
  //   return '0';
  // }

  // const moneyStr = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // return moneyStr;
}

export function NumberOnly(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const REGEX_NUMBER = /^[\d,]+$/g;

  if (!REGEX_NUMBER.test(value)) {
    return { numberOnly: true };
  }

  return null;
}
