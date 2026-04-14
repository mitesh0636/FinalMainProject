import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './Auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { HasRoleDirective } from "./shared/directives/role.directive";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, AsyncPipe, HasRoleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  detsroy$ = new Subject<void>();
  errormessage = "";
  portcount = 0;
  constructor(public authservice: AuthService, private router: Router ) {}

  Logout(){
  this.authservice.logout().pipe(takeUntil(this.detsroy$)).subscribe({
    next :() => {
      this.authservice.currentUser.next(null);
      localStorage.setItem('type', 'user');
      this.authservice.isAdminView.next(false);
      this.router.navigate(['/general']);
    },
    error: (err) => {
     this.errormessage = err.error.message || 'Unable to logout'
    }
  })
  }


  isAdminRoute(): boolean {
    return this.router.url.includes('admin');
  }

  Login(){
    this.router.navigate(['/auth/login']);
  }

  Register(){
    this.router.navigate(['/auth/register']);
  }
}


