import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../Services/agent.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin : boolean = false;
  data: any;

  constructor(private agentService: AgentService, private router: Router) { }

  ngOnInit(): void {
  }
  login(event: any){
    
    let user = (<HTMLInputElement>document.getElementById('username')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;
    console.log("What is this");
    this.agentService.getLoginData(user, password).subscribe((data) => {
      this.data = data;
      console.log(this.data.status);
      document.getElementById('err_msg')!.classList.remove('d-none');
      let aa = document.getElementById('err_msg');
      
      console.log(data.data[0]);
      
      if(data.status < 1){
        (<HTMLElement>aa).classList.remove('d-none');
        (<HTMLElement>aa).innerHTML = this.data.data[0].message;
        
      } else{
        console.log("First Name: " + data.data[0].first_name + "\nLast Name: " + data.data[0].last_name +
            "\nAddress: " + data.data[0].address + "\nUser ID: " + user);
        this.router.navigate(['/home']);
      }
    })
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
  
  }


} 
 // login(event: any){
  // let user = document.getElementById("username");`
      //   let pass = document.getElementById('password');
      //   this.agentService.getLoginData(user, pass).subscribe((data) => {
      //    this.data = data;
      //    console.log(this.data);
      //  });.
 // }
//}

