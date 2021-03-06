import { Component, OnInit } from '@angular/core';
import { AgentService } from '../Services/agent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isRegistered: boolean = false;
  searchData: any[] = [];
  constructor(private agentService: AgentService) { }

  ngOnInit(): void {
    console.log(this.isRegistered);
    if(!this.isRegistered){
      var a = document.getElementById('register_nav');
      a!.classList.remove('d-none');
    } else {
      var b = document.getElementById('register_nav');
      b!.classList.add('d-none');
    }
  }

  fetchResults(){
    console.log("SOmething happened?");
    var a = (<HTMLInputElement>document.getElementById("searchField")).value;
    var b = parseInt((<HTMLSelectElement>document.getElementById("searchBy")).value);
    this.agentService.getSearchResult(a, b).subscribe((data) => {
      console.log(data);
      this.searchData = data.data;
    });
  }

}
