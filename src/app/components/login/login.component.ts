import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BrowserModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
username: any;
password: any;
onSubmit() {
throw new Error('Method not implemented.');
console.log('Username:',this.username);
console.log('Password:', this.password);

}

}
