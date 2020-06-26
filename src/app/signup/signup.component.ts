import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public scrumUserModel: Scrumuser;

  constructor(private _scrumdataService: ScrumdataService) { }

  ngOnInit() {
    this.scrumUserModel = new Scrumuser("ajayiezekiel@linuxjobber.com","Ezekiel Ajayi", "ezekiel", "Developer");
  }

  userTypes = ['Owner', 'Developer'];
  feedback = ''

  onSubmit() {
    console.log(this.scrumUserModel);
    this._scrumdataService.signup(this.scrumUserModel).subscribe(
      data => {
        console.log('SUCCESS!', data);
        this.feedback = 'Account created successfully';
      },
      error => {
        console.log('ERROR'!, error);
        this.feedback = 'Signup failed';
      }
    )
  }
  
}
