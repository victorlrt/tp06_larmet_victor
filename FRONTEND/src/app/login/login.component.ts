import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  login: string = "";
  password: string = "";

  ngOnInit(): void {
  }

  signin() : void {
    console.log("login: " + this.login + " password: " + this.password);
    this.loginService.login(this.login, this.password).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
