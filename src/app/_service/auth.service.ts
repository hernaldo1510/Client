import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any = false;
  professional: any = false;
  professionalData: any;

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

  setProfessional(pro: any) {
    this.professional = pro;
    localStorage.setItem('professional', pro);
  }

  setProfessionalData(data: any) {
    this.professionalData = data;
  }

  getProfessionalData() {
    return this.professionalData;
  }

  getProfessional() {
    if (this.professional === false) {
      const pro = localStorage.getItem('professional');
      if (pro !== null) {
        this.professional = pro;
      }
    }
    return this.professional;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('professional');
  }
}
