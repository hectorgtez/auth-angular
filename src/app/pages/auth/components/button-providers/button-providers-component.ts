import { NgOptimizedImage } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

export type Provider = 'github' | 'google';

@Component({
  selector: 'app-button-providers',
  imports: [],
  templateUrl: './button-providers-component.html',
  styleUrl: './button-providers-component.scss'
})
export class ButtonProvidersComponent {
  @Input() public isLogin: boolean = false;

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  providerAction(provider: Provider): void {
    if (provider === 'google') {
      this.signUpWithGoogle();
    } else {
      this.signUpWithGitHub();
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      await this._authService.signInWithGoogleProvider();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    }
  }

  async signUpWithGitHub(): Promise<void> {
    try {
      await this._authService.signInWithGitHubProvider();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    }
  }
}
