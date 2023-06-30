import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserModel | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getMyInfo().subscribe(
      (response: UserModel) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
