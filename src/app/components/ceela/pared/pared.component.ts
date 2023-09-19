import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-pared',
  templateUrl: './pared.component.html',
  styleUrls: ['./pared.component.scss']
})
export class ParedComponent implements OnInit {

  constructor(private service: DataService) { }

  ngOnInit(): void {

    this.service.getWallMaterials().subscribe((response) => { 
      
      var data = Object.entries(response).map((objt) =>  {
        return {"text": objt[1]["material"],"value": objt[1]["id"]}
      });

      var configs = {
        default: {
          data: data
        }
      }

      new Selectr((document.getElementById("selectrMaterial1") as any), configs.default)

    });
  }

  onChange(id: string) {
    this.service.getWallMaterialsId(id).subscribe((response) => {

      let selectrConductividad1 = document.getElementById("selectrConductividad1") as HTMLInputElement | null
      selectrConductividad1.value = response["k"]

      let selectrDensidad1 = document.getElementById("selectrDensidad1") as HTMLInputElement | null
      selectrDensidad1.value = response["d"]

      let selectrCalor1 = document.getElementById("selectrCalor1") as HTMLInputElement | null
      selectrCalor1.value = response["c"]
      
    })
  }

}
