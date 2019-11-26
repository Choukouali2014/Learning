import { formErrors, validationMessage } from './data';
import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static emailDomain(domainName: string) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const email: string = control.value;
      const   domain = email.substring(email.lastIndexOf('@') + 1);
      if ( email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
          return null;
        } else {
          return{ emailDomain: true};
        }
    };
  }

  static matchEmail(group: AbstractControl): {[key: string]: any} | null  {
    const emailControl = group.get('email');
    const confirmeEmailControl = group.get('confirmEmail');
    if (emailControl.value === confirmeEmailControl.value || (confirmeEmailControl.pristine && confirmeEmailControl.value === '')) {
      return null;
    } else {
      return { emailMistMatch: true};
    }
  }

  static validEmail(control: AbstractControl) {
    const email: string = control.value;
   // const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    if (email === '' ) {
      return null;
    }
    return {validEmail: true};
  }
 static logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstratControl = group.get(key);
      formErrors[key] = '';
  
      if (abstratControl && !abstratControl.valid && (abstratControl.touched || abstratControl.dirty || abstratControl.value !== '')) {
        const messages = validationMessage[key];
  
        for (const errorKey in abstratControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstratControl instanceof FormGroup) {
        this.logValidationErrors(abstratControl);
      }
  
    });
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}