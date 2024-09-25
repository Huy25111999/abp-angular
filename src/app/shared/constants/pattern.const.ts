import { AbstractControl, ValidationErrors } from '@angular/forms';

export const REGEX_MOTOR = /^([0-9]{2})([a-zA-Z]{1})([0-9]{1})([-]{1})([0-9]{4,5})$/;

export const REGEX_CAR =
  /(^([0-9]{2})([a-zA-Z]{1})([-]{1})([0-9]{4,5})$)|(^([0-9]{2})([a-zA-Z]{2})([-]{1})([0-9]{4,5})$)/;

export const REGEX_OTHER = /(?=.*\d)(?=.*[a-zA-Z])(([a-zA-Z0-9]{1,8})-([a-zA-Z0-9]{1,8}))/;

export const REGEX_LINK_YOUTUBE =
  /\b(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)\b/;

export const REGEX_LINK =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~\!@#\$%\^&\*\(\)_\-=\+\{\}\[\]\\\|;:'"\?\/><.,])[A-Za-z\d`~\!@#\$%\^&\*\(\)_\-=\+\{\}\[\]\\\|;:'"\?\/><.,]{0,}$/;

export const REGEX_PHONE = /^(0){1}(3|5|7|8|9)([0-9]{8})$/;
//     /^(([a-z0-9]+)|([a-z0-9]+[a-z0-9.\-\_]*[a-z0-9]+))@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/
export const REGEX_EMAIL =
  /^([a-zA-Z0-9]+)(([\.\-\_][a-zA-Z0-9]+)*)@[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;

export const REGEX_FULLNAME = /^[^`~\!@#\$%\^&\*\(\)_\-=\+\{\}\[\]\\\|;:'"\?\/><.,]+$/;

export function NumberOnly(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const REGEX_NUMBER = /^[\d,]+$/g;

  if (!REGEX_NUMBER.test(value)) {
    return { numberOnly: true };
  }

  return null;
}

export function keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
