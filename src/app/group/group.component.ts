import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit{

  newPost: any;
  postForm: FormGroup;
  commentForm: FormGroup;
  comment: CommentModel | null = null;
  allPosts!: PostModel[];
  group: GroupModel | null = null;
  datepipe: DatePipe = new DatePipe('en-US');
  currentUser: UserModel | null = null;
  constructor(private route: ActivatedRoute,private postService: PostService,private formBuilder: FormBuilder, private userService: UserService, private authService: AuthServiceService){
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const groupId = params['id'];
        this.loadGroup(groupId);

    });
    this.getCurrentUser();
    this.initPostForm();
    this.initCommentForm();

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


  loadGroup(groupId: number): void {
    this.postService.findGroup(groupId).subscribe(
      (group: GroupModel) => {
        this.group = group;

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

addComment(id: number) {
  const { text } = this.commentForm.value;
  this.comment.userId = this.currentUser.userId;
  this.comment.content = text;
  this.postService.addComment(id, this.comment).subscribe(() => {

  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  });
}

createGroupPost(): void {
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
  this.group.posts.push(post);


  this.postService.createGroup(this.group).subscribe(
    (response: any) => {
      console.log('Group created:', response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
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
}}



