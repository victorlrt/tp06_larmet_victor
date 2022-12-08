import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/core/model/client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-component-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private clientService: ClientService) { }


  ngLastname : string = "";
  ngFirstname : string = "";
  ngZipCode : string = "";
  ngTel : string = "";
  ngEmail : string = "";
  ngGender : string = "";
  ngLogin : string = "";
  ngPassword : string = "";
  ngPasswordCheck : string = "";

  showSummary = false

  client: Client = new Client();

  clientForm = new FormGroup({
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
    tel: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender : new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    passwordCheck: new FormControl('', [Validators.required, Validators.minLength(2)])
  });


  clicChange (val : boolean) {
    this.showSummary = val
  }

  // create object Client
  createClient() {
    this.client.lastname = this.clientForm.value.lastname!;
    this.client.firstname = this.clientForm.value.firstname!;
    this.client.zipCode = this.clientForm.value.zipCode!;
    this.client.tel = this.clientForm.value.tel!;
    this.client.email = this.clientForm.value.email!;
    this.client.gender = this.client.gender;
    this.client.login = this.clientForm.value.login!;
    this.client.password = this.clientForm.value.password!;

    this.clientService.postClient(this.client).subscribe(
      (client) => {
        this.clientService.clients.push(client);
      }
    );
  }


  // send object to server
  // display message "client created"


}
