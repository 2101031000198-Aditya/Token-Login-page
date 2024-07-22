// // src/app/permission.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class PermissionGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//     const expectedRole = next.data['admin'];

//     if (!this.authService.isAuthenticated() || this.authService.getRole() !== expectedRole) {
//       this.router.navigate(['/login']);
//       return false;
//     }
//     return true;
//   }
// }
