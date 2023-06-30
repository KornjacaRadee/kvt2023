import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post.model';
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

  public updatePost(post: PostModel): Observable<PostModel> {
    return this.apiService.put(this.config.update_post_url, post);
  }

  public deletePost(postId: number): Observable<void> {
    return this.apiService.delete(`${this.config.delete_post_url}/${postId}`);
  }
}

