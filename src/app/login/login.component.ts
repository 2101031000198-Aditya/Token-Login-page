import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string ='';
  password: string ='';

  constructor(private authService: AuthService,private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe(success => {
        if (success) {
          console.log('Login successful');
          this.router.navigate(['/employee-list']);
        } else {
          console.error('Login failed: Invalid credentials');
          alert("Wrong Credentials")
          
        }
      }, error => {
        console.error('Login failed:', error);
        // Handle login error (display message, clear form, etc.)
      });
  }
}
