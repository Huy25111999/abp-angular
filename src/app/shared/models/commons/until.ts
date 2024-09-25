import * as moment from 'moment';
import { GPS_STATE } from 'src/app/modules/user-feature/journey/models/journey.enum';
import { JourneyModel, TransportMonitorModal } from 'src/app/modules/user-feature/journey/models/journey.model';

export function autoSlashDate(event: any): string {
  if (event.which == 8) {
    if (moment(event.target.value, 'DD/MM/YYYY', true).isValid()) {
      return event.target.value;
    } else {
      let input = event.target.value;
      if (input.includes('//')) {
        input.replace('//', '/');
      }
      return input
    }
  }
  let input = event.target.value;
  if (input.includes('//')) {
    input.replace('//', '/');
  }
  let values = input.split('/').map((v: string, index: number) => {
    v.replace(/\D/g, '');
    if (index === 0) {
      let temp = v.toString().substring(0, 2);
      v = temp;
    }
    if (index === 1) {
      let temp = v.toString().substring(0, 2);
      v = temp;
      // v = checkValue(temp, 12);
    }
    return v;
  });
  if (values[0]) values[0] = checkValue(values[0], 31);
  if (values[1]) values[1] = checkValue(values[1], 12);
  let output = values.map((v: string | any[], i: number) =>
    v.length == 2 && i < 2 ? v + '/' : v
  );
  let result = output.join('').substr(0, 10);
  event.target.value = result;
  if (moment(result, 'DD/MM/YYYY', true).isValid()) {
    return result;
  } else return '';
}

export function autoSlashDateTime(event: any): string {
  const inputValue = event.target.value.replace(/[\/\s:]/g, '');

  const regexDateTime = /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d(\s(([01]{0,1}[0-9])|(2[0-3])):[0-5][0-9])?$/;
  const regexDay = /^([1-9]|([012][0-9])|(3[01]))\/?$/;
  const regexMounth = /^([0]{0,1}[1-9]|1[012])\/?$/;
  const regexYear = /^\d\d\d\d$/;
  const regexHour = /^(([01]{0,1}[0-9])|(2[0-3]))$/;
  const regexMinute = /^[0-5][0-9]$/;

  let day = inputValue.slice(0, 2);
  let mounth = inputValue.slice(2, 4);
  let year = inputValue.slice(4, 8);
  let hour = inputValue.slice(8, 10);
  let minute = inputValue.slice(10, 12);

  if (event.which == 8) {
    return  event.target.value;
  }

  let result = '';
  if (day && regexDay.test(day)) {
    if (day.length === 2) {
      result += (day + '/');
    } else {
      return result + day;
    }
  } else {
    return day.slice(0,2);
  }

  if (mounth && regexMounth.test(mounth)) {
    // if (mounth.length === 2) {
    //   result += (mounth + '/');
    // }
    // else if (mounth.length === 1 && mounth <= 9) {
    //   result += ('0' + mounth + '/');
    // }
    // else {
    //   return result + mounth;
    // }

    if (mounth.length === 2) {
      result += (mounth + '/');
    }
    else if ( mounth <= 9) {   
      result += ( mounth + '/');
    }
    else {
      return result + mounth;
    }
  } else {
    return result + mounth.slice(0, 2);
  }

  if (year && regexYear.test(year)) {
    if (year.length === 4) {
      result += (year + ' ');
    } else {
      return result + year;
    }
  } else {
    return result + year.slice(0, 4);
  }

  if (hour) {
    if (parseInt(hour) >= 0 && parseInt(hour) <= 23) {
      if (hour.length === 2) {
        result += hour + ':';
      } else {
        result += hour;
      }
    } else {
      if (parseInt(hour) < 0) {
        result += '00:';
      } else {
        result += '23:';
      }
    }
  }

  if (minute) {
    if (parseInt(minute) >= 0 && parseInt(minute) <= 59) {
      if (minute.length === 2) {
        result += minute;
      } else if (parseInt(minute) == 0) {
        return result + minute;
      } else {
        result += (minute);
      }
    } else {
      if (parseInt(minute) < 0) {
        result += '00';
      } else {
        result += '59';
      }
    }
  }

  return result;
}

export function autoSlashInputDate(event: any): string {
  const inputValue = event.target.value.replace(/[\/\s:]/g, '');

  const regexDateTime = /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d(\s(([01]{0,1}[0-9])|(2[0-3])):[0-5][0-9])?$/;
  const regexDay = /^([1-9]|([012][0-9])|(3[01]))\/?$/;
  const regexMounth = /^([0]{0,1}[1-9]|1[012])\/?$/;
  const regexYear = /^\d\d\d\d$/;
  const regexHour = /^(([01]{0,1}[0-9])|(2[0-3]))$/;
  const regexMinute = /^[0-5][0-9]$/;

  let day = inputValue.slice(0, 2);
  let mounth = inputValue.slice(2, 4);
  let year = inputValue.slice(4, 8);
  let hour = inputValue.slice(8, 10);
  let minute = inputValue.slice(10, 12);

  if (event.which == 8) {
    return  event.target.value;
  }

  let result = '';
  if (day && regexDay.test(day)) {
    if (day.length === 2) {
      result += (day + '/');
    } else {
      return result + day;
    }
  } else {
    return day.slice(0,2);
  }

  if (mounth && regexMounth.test(mounth)) {
    if (mounth.length === 2) {
      result += (mounth + '/');
    }
    else if ( mounth <= 9) {   
      result += ( mounth + '/');
    }
    else {
      return result + mounth;
    }
  } else {
    return result + mounth.slice(0, 2);
  }

  if (year && regexYear.test(year)) {
    if (year.length === 4) {
      result += (year + ' ');
    } else {
      return result + year;
    }
  } else {
    return result + year.slice(0, 4);
  }
  return result;
}

export function autoSlashInputMonth(event: any): string {
  const inputValue = event.target.value.replace(/[\/\s:]/g, '');

  const regexDateTime = /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d(\s(([01]{0,1}[0-9])|(2[0-3])):[0-5][0-9])?$/;
  const regexDay = /^([1-9]|([012][0-9])|(3[01]))\/?$/;
  const regexMounth = /^([0]{0,1}[1-9]|1[012])\/?$/;
  const regexYear = /^\d\d\d\d$/;
  const regexHour = /^(([01]{0,1}[0-9])|(2[0-3]))$/;
  const regexMinute = /^[0-5][0-9]$/;

  let mounth = inputValue.slice(0, 2);
  let year = inputValue.slice(2, 6);

  if (event.which == 6) {
    return  event.target.value;
  }

  let result = '';
  if (mounth && regexMounth.test(mounth)) {
    if (mounth.length === 2) {
      result += (mounth + '/');
    }
    else if ( mounth <= 9) {   
      result += ( mounth + '/');
    }
    else {
      return result + mounth;
    }
  } else {
    return result + mounth.slice(0, 2);
  }

  if (year && regexYear.test(year)) {
    if (year.length === 4) {
      result += (year + ' ');
    } else {
      return result + year;
    }
  } else {
    return result + year.slice(0, 4);
  }
  return result;
}

export function checkValue(str: any, max: any) {
  if (!str || !str.length) return '';
  if (str.charAt(0) !== '0' || str == '00') {
    let num = parseInt(str);
    if (isNaN(num) || num <= 0 || num > max) num = str.charAt(0);
    str =
      num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
        ? '0' + num
        : num.toString();
  }
  return str;
}

export function autoColon(e: any) {
  var reg = /[0-9]/;
  if (e.target.value.length == 2 && reg.test(e.target.value))
    e.target.value = e.target.value + ':'; //Add colon if string length > 2 and string is a number
  if (e.target.value.length > 5)
    e.target.value = e.target.value.substr(0, e.target.value.length - 1); //Delete the last digit if string length > 5
}
export function numberOnly(event: any, type?: string): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
export function convertStateToString(item: JourneyModel | TransportMonitorModal) {
  if (item.state === GPS_STATE.RUN) {
    item.color = 'green';
    if (item.gpsSpeed >= 1) {
      item.strState = `Chạy (${item.gpsSpeed} km/h)`;
      return item.strState;
    } else {
      item.strState = `Chạy (${item.gpsSpeed} < 1 km/h)`;
      return item.strState;
    }
  }
  if (item.state === GPS_STATE.STOP) {
    item.color = '#1890ff';
    item.strState = `Dừng (${convertSecondToDateTime(item.timeState)})`;
    return item.strState;
  }
  if (item.state === GPS_STATE.PARK) {
    item.color = '#cdb600';
    item.strState = `Đỗ (${convertSecondToDateTime(item.timeState)})`;
    return item.strState;
  }
  if (item.state === GPS_STATE.LOST_GPS) {
    item.color = '#555555';
    item.strState = `Mất GPS (${convertSecondToDateTime(item.timeState)})`;
    return item.strState;
  }
  if (item.state === GPS_STATE.HIBERNATION) {
    item.color = '#CCCCCC';
    item.strState = `Ngủ đông (${convertSecondToDateTime(item.timeState)})`;
    return item.strState;
  }
  if (item.state === GPS_STATE.LOST_INTERNET) {
    item.color = '#ff3434';
    item.strState = `Mất kết nối mạng (${convertSecondToDateTime(item.timeState)})`;
    return item.strState;
  }
  return  'Chưa có thông tin';
}

export function convertSecondToDateTime(pSeconds: number, object?: any) {
  if (pSeconds < 60) {
    return `${pSeconds} s`;
  } else {
    if (pSeconds / 60 < 60) {
      return Math.floor(pSeconds / 60) + '\' ' + pSeconds % 60 + 's';
    } else {
      if (pSeconds / (60 * 60) < 24) {
        return Math.floor(pSeconds / (60 * 60)) + 'h ' + Math.floor((pSeconds % (60 * 60)) / 60) + '\'';
      } else {
        if (pSeconds / (60 * 60 * 24) < 30) {
          return Math.floor(pSeconds / (60 * 60 * 24)) + 'd ' + Math.floor((pSeconds % (60 * 60 * 24)) / (60 * 60)) + 'h';
        } else {
          if (object)
            return " > 1 " + object.month;
          else
            return " > 1 tháng";
        }
      }
    }
  }
}

export function checkPolygonConvex(arr: any[]) {
  const { length } = arr;
  let pre = 0, curr = 0;
  for (let i = 0; i < length; ++i) {
    let dx1 = arr[(i + 1) % length][0] - arr[i][0];
    let dx2 = arr[(i + 2) % length][0] - arr[(i + 1) % length][0];
    let dy1 = arr[(i + 1) % length][1] - arr[i][1];
    let dy2 = arr[(i + 2) % length][1] - arr[(i + 1) % length][1];
    curr = dx1 * dy2 - dx2 * dy1;
    if (curr != 0) {
      if ((curr > 0 && pre < 0) || (curr < 0 && pre > 0))
        return false;
      else
        pre = curr;
    };
  };
  return true;
}

export function convertTime(time: number) {
	var	d = Math.floor(time /(60*60*24));
	var d_dir = time %(60*60*24);
	var h = Math.floor(d_dir/(60*60));
	var h_dir = d_dir%(60*60);
	var m = Math.floor(h_dir/60);
	var s = h_dir%60;

	if((d == 0) && (h == 0) && (m == 0)) {
		return s.toString() + ' giây';
	} else if((d == 0) && (h == 0)){
		return m.toString() + ' phút ' + s.toString()+ ' giây';
	} else if((d == 0) ){
		return h.toString() + ' giờ '+ m.toString() + ' phút ' + s.toString()+ ' giây';
	} else {
		return d.toString() + ' ngày '+ h.toString() + ' giờ '+ m.toString() + ' phút ' + s.toString() + ' giây';
	}

}
