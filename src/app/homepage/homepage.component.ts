import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserModel } from 'src/app/models/user.model';
import { PostModel } from 'src/app/models/post.model';
import { CommentModel } from 'src/app/models/comment.model';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service.service';
import { AuthServiceService } from 'src/app/services/auth.service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  newPost: any;
  postForm: FormGroup;
  commentForm: FormGroup;
  comment: CommentModel | null = null;
  allPosts!: PostModel[];
  datepipe: DatePipe = new DatePipe('en-US');
  currentUser: UserModel | null = null;
  constructor(private postService: PostService,private formBuilder: FormBuilder, private userService: UserService, private authService: AuthServiceService){
  }

  ngOnInit(): void {
    this.initPostForm();
    this.initCommentForm();
    this.getAllPosts();
    this.getCurrentUser();
    this.newPost={
      content: '',
      user: null,
      creationDate: null
    }

    this.comment={
      id: null,
      content: '',
      userId: null,
      postedOn: new Date(),
      post: null
    }
  }

  initPostForm(): void {
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  initCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }
  getCurrentUser() {
    this.userService.getMyInfo().subscribe(
      (response: UserModel) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDelete(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.getAllPosts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  addComment(id: number) {
    const { text } = this.commentForm.value;
    this.comment.userId = this.currentUser.userId;
    this.comment.content = text;
    this.postService.addComment(id, this.comment).subscribe(() => {
      this.getAllPosts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }


  createPost() {
    if (this.postForm.invalid) {
      return;
    }

    const { name, content } = this.postForm.value;

    const post: PostModel = {
      postId: 0,
      postName: name,
      content: content,
      user: this.currentUser,
      comments: [],
      creationDate: new Date()
    };

    this.postService.addPost(post).subscribe(
      (response: PostModel[]) => {
        this.allPosts = response;
        this.postForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  getAllPosts() {
    this.postService.getAllPosts().subscribe(
      (Response: PostModel[]) => {
        this.allPosts = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
  }

}
