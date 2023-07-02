import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth.service.service';
import { UserService } from 'src/app/services/user.service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: any;

  constructor(
    private authService: AuthServiceService,
    private userService: UserService) { }

    ngOnInit() {
      this.user = this.userService.currentUser;
    }

    logout() {
      this.authService.logout();
    }

    signed() {
      return Boolean(this.userService.currentUser);
    }

}
