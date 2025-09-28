import { FormControl } from "@angular/forms";

export interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
