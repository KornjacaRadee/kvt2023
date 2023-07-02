import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { GroupModel } from 'src/app/models/group.model';
import { PostModel } from 'src/app/models/post.model';
import { UserService } from 'src/app/services/user.service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth.service.service';
import { PostService } from 'src/app/services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserModel | null = null;
  form: FormGroup;
  editForm: FormGroup;
  userPosts: PostModel[];
  editedPost: any = null;
  editPostFormVisible = false;
  userGroups: GroupModel[];



  constructor(private userService: UserService,private postService: PostService,private formBuilder: FormBuilder,private authService: AuthServiceService,) {}

  ngOnInit(): void {

      this.getUserInfo();
      this.getUserPosts();
      this.initPostForm();
      this.getUserGroups();


    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  initPostForm(): void {
    this.editForm = this.formBuilder.group({
      postName: ['', Validators.required],
      postContent: ['', Validators.required]
    });
  }

  getUserGroups() {
    this.postService.allGroups().subscribe(
      (response: GroupModel[]) => {
        this.userGroups = response.filter(group => group.user.userId === this.currentUser?.userId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  deleteGroup(id: number) {
    this.postService.deleteGroup(id).subscribe(
      () => {
        this.getUserGroups();
      },
      (error: HttpErrorResponse) => {
        this.getUserGroups();
      }
    );
  }

  signed() {
    return Boolean(this.userService.currentUser);
  }

  getUserPosts() {
    this.postService.getAllPosts().subscribe(
      (response: PostModel[]) => {
        this.userPosts = response.filter(post => post.user.userId === this.currentUser?.userId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.getUserPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
        this.logout();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }}


  openEditForm(post: any) {
    this.editedPost = post;
    this.editPostFormVisible = true;
    this.editForm.patchValue({
      postName: post.postName,
      postContent: post.content
    });
  }

  submitEditForm(post: PostModel) {
      const { postName, postContent } = this.editForm.value;
      this.editedPost = post;
      this.editedPost.content = postContent;
      this.editedPost.postName = postName;
      this.postService.addPost(this.editedPost).subscribe(
        (response: PostModel) => {

          this.cancelEditForm();
          this.getUserPosts();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

  }
  logout() {
    this.authService.logout();
  }

  cancelEditForm() {
    this.editPostFormVisible = false;
    this.form.reset();
  }
}
