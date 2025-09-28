import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../../core/services/auth.service';
import { LogInForm } from '../../../core/interfaces/log-in-form.interface';
import { Credential } from '../../../core/interfaces/credential.interface';
import { ButtonProvidersComponent } from '../components/button-providers/button-providers-component';

@Component({
  selector: 'app-log-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ButtonProvidersComponent,
  ],
  templateUrl: './log-in-component.html',
  styleUrl: './log-in-component.scss'
})
export default class LogInComponent {
  public form!: FormGroup<LogInForm>;
  public hide: boolean = true;
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: this._formBuilder.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: this._formBuilder.control('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');
    const isInvalid = control?.invalid && control.touched;

    if(isInvalid) {
      return control?.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }

    return false;
  }

  async logIn(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    }

    try {
      await this._authService.logInWithEmailAndPassword(credential);
      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar() {
    return this._snackBar.open('Succesfully log in!', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
