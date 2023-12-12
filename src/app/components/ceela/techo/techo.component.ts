import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

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

  uceiling: any;
  ceiling: any = {};

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {

    this.resetOutput();

    // U: preparing zona
    this.summary.getResult().subscribe(result => {
      this.uceiling = {
        "zona": result["selectorZona"]
      }
    })
    
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

      let selectrEspesor = document.getElementById("inputTechoEspesor" + id) as HTMLInputElement | null
      selectrEspesor.value = "0.0"

      this.onChangeEspesor();

    });

  }

  onChangeEspesor() { 

    this.resetOutput();

    let values = [];

    this.layers.forEach(obj => {

      let id = obj.idx

      let materialRef = document.getElementById("selectorTechoMaterial" +  id.toString()) as HTMLSelectElement
      let espesorRef = document.getElementById("inputTechoEspesor" + id.toString()) as HTMLInputElement
      let conductividadRef = document.getElementById("inputTechoConductividad" + id.toString()) as HTMLInputElement
      let densidadRef = document.getElementById("inputTechoDensidad" + id.toString()) as HTMLInputElement
      let calorRef = document.getElementById("inputTechoCalor" + + id.toString()) as HTMLInputElement
      let absortanciaRef = document.getElementById("inputTechoAbsortancia" + + id.toString()) as HTMLInputElement

      let materialText = materialRef.options[materialRef.selectedIndex].text
      let espesorValue = parseFloat(espesorRef.value)
      let conductividadValue = parseFloat(conductividadRef.value)
      let densidadValue = parseFloat(densidadRef.value)
      let calorValue = parseFloat(calorRef.value)
      let absortanciaValue = parseFloat(absortanciaRef.value)

      if (espesorValue != 0 && conductividadValue != 0) {
        values.push({ "e": espesorValue, "k": conductividadValue })

        /* Inicio */
        let valuesLocal = {
          "nombre": materialText,
          "espesor": espesorValue,
          "k": conductividadValue,
          "densidad": densidadValue,
          "cp": calorValue,
          "absortancia": absortanciaValue
        }

        //FALTA n49

        /* Fin */

      }

    });

    if (values.length > 0) {

      this.uceiling["capas"] = values;

      this.service.postUCeiling(this.uceiling).subscribe(uCeilingResult => {

        //UV - set value
        let ceilingUV = document.getElementById("techoUV") as HTMLElement | null
        ceilingUV.textContent = "Valor U: " + parseFloat(uCeilingResult["u"].toString()).toFixed(2) + " [W/m2-K]"

        //Accomplishment - set value
        let ceilingAccomplishment = document.getElementById("techoCumplimiento") as HTMLElement | null
        ceilingAccomplishment.textContent = uCeilingResult["cumple"]

        if(uCeilingResult["cumple"].toString() == "CUMPLE") {
          ceilingAccomplishment.classList.replace("badge-default","badge-success")
          ceilingAccomplishment.classList.replace("badge-danger","badge-success")
        } else {
          ceilingAccomplishment.classList.replace("badge-default","badge-danger")
          ceilingAccomplishment.classList.replace("badge-success","badge-danger")
        }

        this.replaceData("techoUV", parseFloat(uCeilingResult["u"].toString()).toFixed(2))

      })
    }

  }

  replaceData(id, value) {
    this.summary.replaceData(id, value);
  }

  replaceDataObject(idOut, idIn, value) {
    this.summary.replaceDataObject(idOut, idIn, value)
  }

  resetOutput() {

    //U - value to zero
    let ceilingUV = document.getElementById("techoUV") as HTMLElement | null
    ceilingUV.textContent = "Valor U: 0.0 [W/m2-K]"

    //SRI - value to zero
    let ceilingSRI = document.getElementById("techoSRI") as HTMLElement | null
    ceilingSRI.textContent = "SRI: 0.0 [-]"

    // Accomplishment
    let ceilingCompliance = document.getElementById("techoCumplimiento") as HTMLElement | null
    ceilingCompliance.textContent = "SIN VALOR"

    // Accomplishment - reset
    ceilingCompliance.classList.replace("badge-success","badge-default")
    ceilingCompliance.classList.replace("badge-danger","badge-default")
  }

  addRowLayerCeiling() {
    
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

  removeRowLayerCeiling(idx: number) {
    const index = this.layers.findIndex(obj => obj.idx === idx);
    this.layers.splice(index, 1);
    this.layers.forEach((obj, index) => {
      obj.idx = index + 1;
    });
    setTimeout(() => {
      // We need to wait for the DOM to update
      // Not the best way to achieve it, but its the only one to avoid total refactor
      this.onChangeEspesor();
    });
  }

}
