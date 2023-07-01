import {Injectable} from '@angular/core';
import {ApiService} from './api.service.service';
import {ConfigService} from './config.service.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) {
  }

  changePassword(user: any){
    return this.apiService.put(this.config.change_password_url, user);
  }

  getMyInfo() {
    return this.apiService.get(this.config.profile_url)
      .pipe(map(user => {
        this.currentUser = user;
        return user;
      }));
  }

  getAll() {
    return this.apiService.get(this.config.users_url);
  }

}
