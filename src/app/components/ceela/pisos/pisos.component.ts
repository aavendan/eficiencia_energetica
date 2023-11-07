import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-piso',
  templateUrl: './pisos.component.html',
  styleUrls: ['./pisos.component.scss']
})
export class PisosComponent implements OnInit {

  focus1;

  layers = [];

  ufloor: any;
  floor: any = {};

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {
    this.resetOutput();

    // U: preparing zona
    this.summary.getResult().subscribe(result => {
      this.ufloor = {
        "zona": result["selectorZona"]
      }
    })
  }

  resetOutput() {

    //U - value to zero
    let floorUV = document.getElementById("pisoUV") as HTMLElement | null
    floorUV.textContent = "Valor U: 0.0 [W/m2-K]"

    // Accomplishment
    let floorCompliance = document.getElementById("pisoCumplimiento") as HTMLElement | null
    floorCompliance.textContent = "SIN VALOR"

    // Accomplishment - reset
    floorCompliance.classList.replace("badge-success","badge-default")
    floorCompliance.classList.replace("badge-danger","badge-default")
  }

  onChange(id: string, materialId: string) {

    this.service.getRoofMaterialsId(materialId).subscribe((response) => {

      let selectrConductividad = document.getElementById("inputPisoConductividad"+id) as HTMLInputElement | null
      selectrConductividad.value = response["k"]

      let selectrDensidad = document.getElementById("inputPisoDensidad"+id) as HTMLInputElement | null
      selectrDensidad.value = response["d"]

      let selectrCalor = document.getElementById("inputPisoCalor"+id) as HTMLInputElement | null
      selectrCalor.value = response["c"]

      this.onChangeEspesor();

    });

  }

  onChangeEspesor() { 

    this.resetOutput();

    let values = [];

    this.layers.forEach(obj => {

      let id = obj.idx

      let materialRef = document.getElementById("selectorMaterialPiso" +  id.toString()) as HTMLSelectElement
      let espesorRef = document.getElementById("inputPisoEspesor" + id.toString()) as HTMLInputElement
      let conductividadRef = document.getElementById("inputPisoConductividad" + id.toString()) as HTMLInputElement
      let densidadRef = document.getElementById("inputPisoDensidad" + id.toString()) as HTMLInputElement
      let calorRef = document.getElementById("inputPisoCalor" + + id.toString()) as HTMLInputElement
      
      let materialText = materialRef.options[materialRef.selectedIndex].text
      let espesorValue = parseFloat(espesorRef.value)
      let conductividadValue = parseFloat(conductividadRef.value)
      let densidadValue = parseFloat(densidadRef.value)
      let calorValue = parseFloat(calorRef.value)
      
      if (espesorValue != 0 && conductividadValue != 0) {
        values.push({ "e": espesorValue, "k": conductividadValue })

        /* Inicio */
        let valuesLocal = {
          "nombre": materialText,
          "espesor": espesorValue,
          "k": conductividadValue,
          "densidad": densidadValue,
          "cp": calorValue
        }

        //FALTA n49

        /* Fin */

      }

    });

    if (values.length > 0) {

      this.ufloor["capas"] = values;

      this.service.postUFloor(this.ufloor).subscribe(uFloorResult => {

        //UV - set value
        let floorUV = document.getElementById("pisoUV") as HTMLElement | null
        floorUV.textContent = "Valor U: " + parseFloat(uFloorResult["u"].toString()).toFixed(2) + " [W/m2-K]"

        //Accomplishment - set value
        let floorAccomplishment = document.getElementById("pisoCumplimiento") as HTMLElement | null
        floorAccomplishment.textContent = uFloorResult["cumple"]

        if(uFloorResult["cumple"].toString() == "CUMPLE") {
          floorAccomplishment.classList.replace("badge-default","badge-success")
          floorAccomplishment.classList.replace("badge-danger","badge-success")
        } else {
          floorAccomplishment.classList.replace("badge-default","badge-danger")
          floorAccomplishment.classList.replace("badge-success","badge-danger")
        }

        this.replaceData("pisoUV", parseFloat(uFloorResult["u"].toString()).toFixed(2))

      })
    }

  }

  replaceData(id, value) {
    this.summary.replaceData(id, value);
  }

  replaceDataObject(idOut, idIn, value) {
    this.summary.replaceDataObject(idOut, idIn, value)
  }

  addRowLayerFloor() {
    
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
