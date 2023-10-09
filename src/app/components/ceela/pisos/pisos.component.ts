import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-pisos',
  templateUrl: './pisos.component.html',
  styleUrls: ['./pisos.component.scss']
})
export class PisosComponent implements OnInit {

  focus1;

  layers = []

  constructor(private service: DataService) { }

  ngOnInit(): void {
  }

  addRowCapaPiso() {
    
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

      new Selectr((document.getElementById("selectorMaterialPiso"+(count+1).toString()) as any), configs.default)
      
    });


  }

  

}
