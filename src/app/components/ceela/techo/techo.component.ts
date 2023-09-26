import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";

@Component({
  selector: 'app-techo',
  templateUrl: './techo.component.html',
  styleUrls: ['./techo.component.scss']
})
export class TechoComponent implements OnInit {


  layers = [1,2,3]

  constructor(private service: DataService) { }

  ngOnInit(): void {
    
  }

}
