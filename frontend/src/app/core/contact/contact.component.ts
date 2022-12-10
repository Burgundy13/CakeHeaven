import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
import { CakesService } from 'src/app/service/cakes.service';
import { CakesComponent } from '../cakes/cakes.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @Input() user: User = new User();

  messages: Message = new Message();

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get message() {
    return this.form.get('message');
  }

  constructor(private service: CakesService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.service.getUser().subscribe({
      next: (response: User) => {
        this.user = response;
        this.messages.name = this.user.firstName + ' ' + this.user.lastName;
        this.messages.email = this.user.email;
        this.messages.message = this.messages.message;
        this.form.patchValue(this.messages);
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
  }
  onSend(): void {
    this.messages = new Message(this.form.value);
    this.service.postMessage(this.messages).subscribe({
      next: (response: Message) => {
        this.router.navigate(['/home']);
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
  }
}
