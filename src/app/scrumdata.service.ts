import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser } from './scrumuser';


@Injectable({
  providedIn: 'root'
})
export class ScrumdataService {

  constructor(private _http: HttpClient) { }

  _url='https://liveapi.chatscrum.com/scrum/api/scrumusers/';

  _loginUrl = 'https://stageapi.chatscrum.com/scrum/api-token-auth/';

  _scrumProjectUrl = 'https://stageapi.chatscrum.com/scrum/api/scrumprojects/';


  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  } 

  signup(user: Scrumuser) {
    const userData = {
      email: user['email'],
      password: user['password'],
      full_name: user['fullname'],
      usertype: user['type'],
      projectname: user['projname']
    }
    return this._http.post<any>(this._url, userData, this.httpOptions)
  }

  login(user) {
    const userData = {
      username: user['email'],
      password: user['password'],
      project: user['projname']
    }
    return this._http.post<any>(this._loginUrl, userData, this.httpOptions)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  allProjectGoals(project_id) {
    return this._http.get<any>(this._scrumProjectUrl + project_id, this.httpOptions)
  }
    
}
