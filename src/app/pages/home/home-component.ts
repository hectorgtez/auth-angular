import { Component, inject } from '@angular/core';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export default class HomeComponent {
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this._authService.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.error(error);
    }
  }
}
