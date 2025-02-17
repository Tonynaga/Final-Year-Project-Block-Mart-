import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {

  }

  register() {

    if(this.email == '') {
      alert('Please Enter Your E-Mail');
      return;
    }

    if(this.password == '') {
      alert('Please Enter Your Password');
      return;
    }

    this.auth.register(this.email,this.password);
    this.email = '';
    this.password = '';

  }
}
