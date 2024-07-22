import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees!: any[];
  role: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getEmployeeList()
      .subscribe(
        employees => {
          this.employees = employees;
        },
        error => {
          console.error('Error fetching employees:', error);
          // Handle error (display message, retry, etc.);
        }
      );
      this.role = this.authService.getRole();
      console.log("Employee",this.role)
  }
}
