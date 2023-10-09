import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-techo',
  templateUrl: './techo.component.html',
  styleUrls: ['./techo.component.scss']
})
export class TechoComponent implements OnInit {

  focus1;
  focus2;

  layers = []

  constructor(private service: DataService) { }

  ngOnInit(): void {
    
  }

  addRowCapaTecho() {
    
    let count = this.layers.length
    this.layers.push({ idx: count+1 });

    this.service.getWallMaterials().subscribe((response) => { 
      
      var data = Object.entries(response).map((objt) =>  {
        return {"text": objt[1]["material"],"value": objt[1]["id"]}
      });

      var configs = {
        default: {
          data: data
        }
      }

      new Selectr((document.getElementById("selectorTechoMaterial"+(count+1).toString()) as any), configs.default)
      
    });


  }

}
