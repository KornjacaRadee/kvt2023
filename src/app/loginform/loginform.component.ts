import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ConfigService } from 'src/app/services';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {

  title = 'Login';
  form: FormGroup;
  submitted = false;
  notification!: DisplayMessage;

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.notification = undefined;
    this.submitted = true;

    this.authService.login(this.form.value)
      .subscribe(data => {
          this.userService.getMyInfo().subscribe();
          this.router.navigate(['/home']);
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
        });
  }

}
