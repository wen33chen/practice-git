import { AbstractControl } from '@angular/forms';
export function PhoneNumberValidator(control: AbstractControl) {
  let str: string = control.value;
  console.log(control)
  if (str.indexOf('-') == -1) {
    return { 'phoneNumber': '電話格式錯誤!' };
  }
  else {
    return null;
  }
}
