import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post.model';
import { GroupModel } from 'src/app/models/group.model';
import { Router } from '@angular/router';
import { ConfigService} from 'src/app/services/config.service.service';
import { ApiService } from 'src/app/services/api.service.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
  ) {}

  public getAllPosts(): Observable<PostModel[]> {
    return this.apiService.get(this.config.posts_url);
  }

  public addPost(post: any): Observable<any> {
    return this.apiService.post(this.config.new_post_url, post);
  }

  public addComment(postId: number,comment: any): Observable<any> {
    return this.apiService.put(this.config.add_comment_url + postId, comment);
  }
  public addLike(postId: number,userId: number): Observable<any> {
    return this.apiService.put(`${this.config.like_url}${postId}/${userId}`,"");
  }
  public removeLike(postId: number,userId: number): Observable<any> {
    return this.apiService.delete(`${this.config.unlike_url}${postId}/${userId}`,"");
  }

  public updatePost(post: PostModel): Observable<PostModel> {
    return this.apiService.put(this.config.update_post_url, post);
  }

  public deletePost(postId: number): Observable<void> {
    return this.apiService.delete(`${this.config.delete_post_url}/${postId}`);
  }

//GROUPS NEMA PUNO PA DA NE PRAVIM DRUGI SERVICE

  public createGroup(group: GroupModel): Observable<void> {
    return this.apiService.post(this.config.add_group_url,group);
  }

  public allGroups(): Observable<GroupModel[]> {
    return this.apiService.get(this.config.all_groups_url,"");
  }

  public findGroup(id: number): Observable<GroupModel> {
    return this.apiService.get(`${this.config.group_id_url}${id}`,"");
  }

  public deleteGroup(id: number): Observable<GroupModel> {
    return this.apiService.delete(`${this.config.group_delete_url}${id}`,"");
  }


}

