import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-pared',
  templateUrl: './pared.component.html',
  styleUrls: ['./pared.component.scss']
})
export class ParedComponent implements OnInit {

  layers = [1,2,3]

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

      this.layers.forEach(id => {
        new Selectr((document.getElementById("selectrMaterial"+id.toString()) as any), configs.default)
      });

      

    });
  }

  onChange(id: string, materialId: string) {
    this.service.getWallMaterialsId(materialId).subscribe((response) => {

      let selectrConductividad = document.getElementById("selectrConductividad"+id) as HTMLInputElement | null
      selectrConductividad.value = response["k"]

      let selectrDensidad = document.getElementById("selectrDensidad"+id) as HTMLInputElement | null
      selectrDensidad.value = response["d"]

      let selectrCalor = document.getElementById("selectrCalor"+id) as HTMLInputElement | null
      selectrCalor.value = response["c"]
      
      let selectrEspesor = document.getElementById("selectrEspesor"+id) as HTMLInputElement | null
      selectrEspesor.value = "0.0"
      
      this.onChangeEspesor();
    })
  }

  onChangeEspesor() {
    
    let values = [];

    this.layers.forEach(id => {
      let espesorRef = document.getElementById("selectrEspesor"+id.toString()) as HTMLInputElement
      let conductividadRef = document.getElementById("selectrConductividad"+id.toString()) as HTMLInputElement
      
      let espesorValue = parseFloat(espesorRef.value)
      let conductividadValue = parseFloat(conductividadRef.value)

      if(espesorValue != 0 && conductividadValue != 0) {
        values.push( {"e":espesorValue, "k":conductividadValue } )
      }
      

    });

    if(values.length > 0) {
      this.service.postUV(values).subscribe(result => {
        let paredUV = document.getElementById("paredUV") as HTMLInputElement | null
        paredUV.value = result.toString()
      })
    }
    
    

  }

}
