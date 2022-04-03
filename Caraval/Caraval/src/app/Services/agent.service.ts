import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private httpClient: HttpClient) { 

  }

  getLoginData(user: string, password: string) : Observable<any>{
    return this.httpClient.post('http://localhost:8080/login', 
      {username: user, password: password}
    );
  }
}
