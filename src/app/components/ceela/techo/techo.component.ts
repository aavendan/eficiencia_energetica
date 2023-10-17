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
    let techoUV = document.getElementById("techoUV") as HTMLElement | null
    techoUV.textContent = "Valor U: 0.0 [W/m2-K]"

    let techoSRI = document.getElementById("techoSRI") as HTMLElement | null
    techoSRI.textContent = "SRI: 0.0 [-]"
  }

  addRowCapaTecho() {
    
    let count = this.layers.length
    this.layers.push({ idx: count+1 });

    this.service.getRoofMaterials().subscribe((response) => { 
      
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

  onChange(id: string, materialId: string) {

    this.service.getRoofMaterialsId(materialId).subscribe((response) => {

      let selectrConductividad = document.getElementById("inputTechoConductividad"+id) as HTMLInputElement | null
      selectrConductividad.value = response["k"]

      let selectrDensidad = document.getElementById("inputTechoDensidad"+id) as HTMLInputElement | null
      selectrDensidad.value = response["d"]

      let selectrCalor = document.getElementById("inputTechoCalor"+id) as HTMLInputElement | null
      selectrCalor.value = response["c"]

      let selectrAbsortancia = document.getElementById("inputTechoAbsortancia"+id) as HTMLInputElement | null
      selectrAbsortancia.value = response["a"]

    });

  }

}
