import { inject, Injectable } from '@angular/core';
import {
  Auth,
  AuthProvider,
  authState,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential
} from '@angular/fire/auth';

import { Credential } from '../interfaces/credential.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth: Auth = inject(Auth);
  public readonly authState$ = authState(this._auth);

  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this._auth,
      credential.email,
      credential.password
    )
  }

  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this._auth,
      credential.email,
      credential.password
    )
  }

  logOut(): Promise<void> {
    return this._auth.signOut();
  }

  // Providers

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  signInWithGitHubProvider() {
    const provider = new GithubAuthProvider();
    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      return await signInWithPopup(this._auth, provider);
    } catch (error: any) {
      return error;
    }
  }
}
