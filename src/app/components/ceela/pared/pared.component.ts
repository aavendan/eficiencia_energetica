import { Component, OnInit, Input  } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-pared',
  templateUrl: './pared.component.html',
  styleUrls: ['./pared.component.scss']
})
export class ParedComponent implements OnInit {

  layers = [1,2,3]

  @Input() location: string;

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
        new Selectr((document.getElementById("selectrMaterial"+this.location+id.toString()) as any), configs.default)
      });

      

    });
  }

  onChange(location: string, id: string, materialId: string) {
    this.service.getWallMaterialsId(materialId).subscribe((response) => {

      let selectrConductividad = document.getElementById("selectrConductividad"+location+id) as HTMLInputElement | null
      selectrConductividad.value = response["k"]

      let selectrDensidad = document.getElementById("selectrDensidad"+location+id) as HTMLInputElement | null
      selectrDensidad.value = response["d"]

      let selectrCalor = document.getElementById("selectrCalor"+location+id) as HTMLInputElement | null
      selectrCalor.value = response["c"]
      
      let selectrEspesor = document.getElementById("selectrEspesor"+location+id) as HTMLInputElement | null
      selectrEspesor.value = "0.0"
      
      this.onChangeEspesor();
    })
  }

  onChangeEspesor() {
    
    let values = [];

    this.layers.forEach(id => {
      let espesorRef = document.getElementById("selectrEspesor"+this.location+id.toString()) as HTMLInputElement
      let conductividadRef = document.getElementById("selectrConductividad"+this.location+id.toString()) as HTMLInputElement
      
      let espesorValue = parseFloat(espesorRef.value)
      let conductividadValue = parseFloat(conductividadRef.value)

      if(espesorValue != 0 && conductividadValue != 0) {
        values.push( {"e":espesorValue, "k":conductividadValue } )
      }
      

    });

    if(values.length > 0) {
      this.service.postUV(values).subscribe(result => {
        let paredUV = document.getElementById("paredUV"+this.location) as HTMLElement | null
        paredUV.textContent = "Valor U [W/m2-K] " +parseFloat(result.toString()).toFixed(2)
        
        // let paredUV = document.getElementById("paredUV"+this.location) as HTMLInputElement | null
        // paredUV.value = parseFloat(result.toString()).toFixed(2)
        
      })
    }
    
    

  }

}
