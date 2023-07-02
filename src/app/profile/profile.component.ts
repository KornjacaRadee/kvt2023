import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserModel | null = null;
  form: FormGroup;

  constructor(private userService: UserService,private formBuilder: FormBuilder) {}

  ngOnInit(): void {

      this.getUserInfo();


    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  signed() {
    return Boolean(this.userService.currentUser);
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

  changePasswordForm(){
    const { oldPassword, newPassword, repeatPassword } = this.form.value;
    console.log(oldPassword);
    console.log(this.currentUser.password);
    if(newPassword == repeatPassword){
    this.currentUser.password = newPassword;
    this.userService.changePassword(this.currentUser,oldPassword).subscribe(
      (response: UserModel) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }}
}
