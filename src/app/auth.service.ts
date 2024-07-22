import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7109/api';
  private tokenSubject: BehaviorSubject<string>;
  private userRole: string = '';

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '');
  }

  get token(): string {
    return this.tokenSubject.value;
  }

  getRole(): string {
    return this.userRole;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/token`, { email, password })
      .pipe(
        map(response => {
          const token = response && response.token;
          const role = response && response.role;
          console.log('Received token:', token);
          console.log('Received role:', role);
          if (token) {
            localStorage.setItem('token', token);
            this.tokenSubject.next(token);
            this.userRole = role;
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next('');
  }

  getEmployeeList(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.apiUrl}/employee`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching employee list:', error);
        throw error; 
      })
    );
    
  }
}
