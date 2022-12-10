import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  newUser: User = new User();
  onEditMode: boolean = false;

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }

  constructor(private service: CakesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUser();
    this.form.disable();
  }

  getUser(): void {
    this.service.getUser().subscribe({
      next: (response: User) => {
        this.user = response;
        this.form.patchValue(this.user);
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
  }
  onEdit(): void {
    this.form.enable();
    this.onEditMode = true;
  }
  onCancel(): void {
    this.onEditMode = false;
    this.form.patchValue(this.user);
    this.form.disable();
  }
  onOk(): void {
    let newUser: User = new User(this.form.value);
    newUser._id = this.user._id;
    this.service.updateUser(newUser).subscribe({
      next: (response: User) => {
        this.onEditMode = false;
        this.form.disable();
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
  }
}
