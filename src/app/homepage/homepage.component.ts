import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserModel } from 'src/app/models/user.model';
import { PostModel } from 'src/app/models/post.model';
import { CommentModel } from 'src/app/models/comment.model';
import { LikeModel } from 'src/app/models/like.model';
import { GroupModel } from 'src/app/models/group.model';
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
  groupForm: FormGroup;
  comment: CommentModel | null = null;
  allPosts!: PostModel[];
  allGroups: GroupModel[];

  datepipe: DatePipe = new DatePipe('en-US');
  currentUser: UserModel | null = null;
  constructor(private postService: PostService,private formBuilder: FormBuilder, private userService: UserService, private authService: AuthServiceService){
  }

  ngOnInit(): void {
    this.initPostForm();
    this.initCommentForm();
    this.getAllPosts();
    this.initGroupForm()
    if(this.signed){
      this.getCurrentUser();
      this.getAllGroups();
    }
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

  initGroupForm(): void {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  initCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }
  getCurrentUser() {
    if(this.signed){
    this.userService.getMyInfo().subscribe(
      (response: UserModel) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }}

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

  signed() {
    return Boolean(this.userService.currentUser);
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
      creationDate: new Date(),
      likes: []
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

  likePost(post: any){
    const alreadyLiked = post.likes.some((like: LikeModel) => like.userId === this.currentUser?.userId);
    if(!alreadyLiked){
    this.postService.addLike(post.postId,this.currentUser.userId).subscribe(
      (Response: PostModel[]) => {
        this.allPosts = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
    }else{
      this.postService.removeLike(post.postId,this.currentUser.userId).subscribe(
        (Response: PostModel[]) => {
          this.allPosts = Response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        );
    }
  }

  createGroup() {
    if (this.groupForm.invalid) {
      return;
    }

    const { name, description } = this.groupForm.value;

    const group: GroupModel = {
      id: 0,
      name: name,
      descripiton: description,
      creationDate: new Date(),
      posts: [],
      user: this.currentUser
    };

    this.postService.createGroup(group).subscribe(
      (response: any) => {
        console.log('Group created successfully');
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

  getAllGroups() {
    this.postService.allGroups().subscribe(
      (response: GroupModel[]) => {
        this.allGroups = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
