import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service.service';
import { UserService } from 'src/app/services/user.service.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ConfigService } from 'src/app/services/config.service.service';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit{

  title = 'Login';
  form: FormGroup;
  submitted = false;
  notification!: DisplayMessage;

  returnUrl = this.configService.posts_url;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthServiceService,
    private configService: ConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {

    this.notification = undefined;
    this.submitted = true;

    this.authService.login(this.form.value)
      .subscribe(data => {
          this.userService.getMyInfo().subscribe();
          this.router.navigate(['/homepage']);
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Username or password not valid.'};
        });
  }
}

