import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = false;
  constructor() {}

  getToken(): any {
    return this.token;
  }

  removeToken() {
    this.token = false;
  }

  setToken(tk: any) {
    this.token = tk;
  }
}
