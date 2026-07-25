import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get("password")?.value;
  const confirmation = group.get("confirmation")?.value;
  return password === confirmation ? null : { passwordsMismatch: true };
}
