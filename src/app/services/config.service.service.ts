import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8080/api';
  private _auth_url = this._api_url + '/auth';

  private _login_url = this._auth_url + '/login';

  get login_url(): string {
    return this._login_url;
  }

  private _profile_url = this._auth_url + '/profile';

  get profile_url(): string {
    return this._profile_url;
  }

  private _signup_url = this._auth_url + '/signup';

  get signup_url(): string {
    return this._signup_url;
  }

  private _post_url = this._api_url + '/post';

  private _posts_url = this._post_url + '/allposts';

  get posts_url(): string {
    return this._posts_url;
  }

  private _new_post_url = this._post_url + '/new';

  get new_post_url(): string {
    return this._new_post_url;
  }

  private _update_post_url = this._post_url + '/update';

  get update_post_url(): string {
    return this._update_post_url;
  }

  private _delete_post_url = this._post_url + '/delete';

  get delete_post_url(): string {
    return this._delete_post_url;
  }


  private _user_url = ''



  private _users_url = this._user_url + '/all';

  get users_url(): string {
    return this._users_url;
  }



}
