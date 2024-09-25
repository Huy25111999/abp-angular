/**
 * Ở app component có hàm check ngông ngữ và copy nội dùng của DATE_FORMAT_VI, DATE_FORMAT_EN tương ứng vào DATE_FORMAT
 **/
export const DATE_FORMAT: any = { }


export const DATE_FORMAT_VI: any = {
    DATE: 'dd/MM/yyyy',
    MOUNTH: 'MM/yyyy',
    MONTH: 'yyyy-MM',
    DATE_MOMENT: 'DD/MM/yyyy HH:mm:ss', // format by moment
    DATE_TIME: 'dd/MM/yyyy HH:mm:ss',
    DATE_TIME_REVERT: 'hh:mm:ss dd/MM/yyyy',
    DATE_TIME_REVERT_MOMENT: 'hh:mm:ss DD/MM/yyyy',
    TIME: 'HH:mm:ss',
    DATE_HM:'dd/MM/yyyy HH:mm',
    DATE_HM_MOMENT:'DD/MM/yyyy HH:mm',
    DATE_TIME_APM: 'dd/MM/yy hh:mm:ss a',
    DATETIME:'DD/MM/YYYY - HH:mm:ss',
    DATE_ONLY_MOMENT:'DD/MM/YYYY',
    DATE_ONLY_MOMENT1:'YYYY-MM-DD',
    YYYY_MM_DD_HH_MM:'yyyy-MM-dd HH:mm:ss',
    DATE_TIME1: 'dd/MM/yyyy HH:mm',
    START_TIME_VERSION: 'yyyy-MM-DD HH:mm:ss',
    HM_DATE: 'HHmmDDMMyyyy',
    DAY: 'yyyy-MM-DD',
    YEAR: 'yyyy',
    MOMENT_DATE: 'DDMMyyyy'
}

export const DATE_FORMAT_EN: any = {
  DATE: 'MM/dd/yyyy',
  DATE_MOMENT: 'MM/DD/yyyy HH:mm:ss',
  DATE_TIME: 'MM/dd/yyyy HH:mm:ss',
  DATE_TIME_REVERT: 'hh:mm:ss MM/dd/yyyy',
  DATE_TIME_REVERT_MOMENT: 'hh:mm:ss MM/DD/yyyy',
  TIME: 'HH:mm:ss',
  DATE_HM:'dd/MM/yyyy HH:mm',
  DATE_ONLY_MOMENT:'MM/DD/YYYY',
  DATE_ONLY_MOMENT1:'YYYY-DD-MM',
  DATE_TIME1: 'MM/dd/yyyy HH:mm'
}
