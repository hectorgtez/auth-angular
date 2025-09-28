import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../core/services/auth.service';
import { SignUpForm } from '../../../core/interfaces/sign-up-form.interface';
import { Credential } from '../../../core/interfaces/credential.interface';
import { ButtonProvidersComponent } from '../components/button-providers/button-providers-component';

@Component({
  selector: 'app-sign-up',
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
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.scss'
})
export default class SignUpComponent implements OnInit {
  public form!: FormGroup<SignUpForm>;
  public hide: boolean = true;
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: this._formBuilder.control('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      lastName: this._formBuilder.control('', {
        validators: Validators.required,
        nonNullable: true,
      }),
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

  async signUp(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    }

    try {
      await this._authService.signUpWithEmailAndPassword(credential);
      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar() {
    return this._snackBar.open('Succesfully sign up!', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
