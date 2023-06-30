import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/auth.service.service';
import { UserService } from 'src/app/services/user.service.service';
import { SignupRequestPayload } from './singup-reguest.payload';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent {
  title = 'Sign up';
  form!: FormGroup;

  submitted = false;

  returnUrl!: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {

    this.submitted = true;

    this.authService.signup(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.authService.login(this.form.value).subscribe(() => {
          this.userService.getMyInfo().subscribe();
        });
        this.router.navigate([this.returnUrl]);
      },
        error => {
          this.submitted = false;
          console.log('Sign up error');
        });

  }
}
