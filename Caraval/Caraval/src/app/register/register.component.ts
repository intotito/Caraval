import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AgentService } from '../Services/agent.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private agentService: AgentService) { 
    this.registerForm = this.formBuilder.group({
      userid: [''], 
      password: [''],
      fName: [''],
      lName: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("Submit pressed");
    console.log(this.registerForm.value);
    this.agentService.postRegistrationInfo(this.registerForm.value).subscribe((data)=>{
      console.log("Data = " + data.data);
    })
  }
}
