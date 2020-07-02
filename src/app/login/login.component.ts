import { Component, OnInit } from '@angular/core';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  scrumUserLoginData = {email: "", password: "", projname: ""}

  constructor(
    private _scrumdataservice: ScrumdataService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  
  }

  feedback = ''

  onLoginSubmit() {
    this._scrumdataservice.login(this.scrumUserLoginData).subscribe(
      data => {
        console.log('SUCCESS', data);
        this.feedback = 'Successfully Logged In'
        localStorage.setItem('token', data.token);
        this._router.navigate(['/scrumboard']);
      },
      error => {
        console.log('ERROR', error);
        this.feedback = 'Invalid Credentials'
      }
    )
  }

}
