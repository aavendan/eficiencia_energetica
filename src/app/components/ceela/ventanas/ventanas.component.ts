import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-ventanas',
  templateUrl: './ventanas.component.html',
  styleUrls: ['./ventanas.component.scss']
})
export class VentanasComponent implements OnInit {

  @Input() location: string;

  constructor(private service: DataService) { }

  ngOnInit(): void {

    let ventanaUV = document.getElementById("ventanaUV"+this.location) as HTMLElement | null
    ventanaUV.textContent = "Valor U: 0.0 [W/m2-K]"

    let ventanaSHGC = document.getElementById("ventanaSHGC"+this.location) as HTMLElement | null
    ventanaSHGC.textContent = "SGHC 0.00 [-]"

    this.service.getWallMaterials().subscribe((response) => { 
      
      var data = Object.entries(response).map((objt) =>  {
        return {"text": objt[1]["material"],"value": objt[1]["id"]}
      });

      var configs = {
        default: {
          data: data
        }
      }

      new Selectr((document.getElementById("selectrTipo"+this.location) as any), configs.default)
      
      

    });

  }

}
