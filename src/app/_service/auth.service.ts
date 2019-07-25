import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any = false;
  constructor() {}

  getToken(): any {
    if (this.token === false) {
      const tk = localStorage.getItem('token');
      if (tk !== null) {
        this.token = tk;
      }
    }
    return this.token;
  }

  removeToken() {
    this.token = false;
  }

  setToken(tk: any) {
    this.token = tk;
    localStorage.setItem('token', tk);
  }
}
