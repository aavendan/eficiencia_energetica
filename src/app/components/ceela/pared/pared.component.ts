import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-pared',
  templateUrl: './pared.component.html',
  styleUrls: ['./pared.component.scss']
})
export class ParedComponent implements OnInit {

  wall: any = {};
  layers = [];

  uwall: any;

  @Input() location: string;
  

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {

    this.resetOutput();

    // U: preparing zona
    this.summary.getResult().subscribe(result => {
      this.uwall = {
        "zona": result["selectorZona"]
      }
    })

  }

  onChange(location: string, id: string, materialId: string) {

    this.service.getWallMaterialsId(materialId).subscribe((response) => {

      let selectrConductividad = document.getElementById("inputParedConductividad" + this.toTitleCase(location) + id) as HTMLInputElement | null
      selectrConductividad.value = response["k"]

      let selectrDensidad = document.getElementById("inputParedDensidad" + this.toTitleCase(location) + id) as HTMLInputElement | null
      selectrDensidad.value = response["d"]

      let selectrCalor = document.getElementById("inputParedCalor" + this.toTitleCase(location) + id) as HTMLInputElement | null
      selectrCalor.value = response["c"]

      let selectrEspesor = document.getElementById("inputParedEspesor" + this.toTitleCase(location) + id) as HTMLInputElement | null
      selectrEspesor.value = "0.0"

      this.onChangeEspesor();
    })
  }

  onChangeEspesor() {

    this.resetOutput();

    let values = [];

    this.layers.forEach(obj => {

      let id = obj.idx

      let materialRef = document.getElementById("selectorParedMaterial" + this.toTitleCase(this.location) + id.toString()) as HTMLSelectElement
      let espesorRef = document.getElementById("inputParedEspesor" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement
      let conductividadRef = document.getElementById("inputParedConductividad" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement
      let densidadRef = document.getElementById("inputParedDensidad" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement
      let calorRef = document.getElementById("inputParedCalor" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement

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

        // n49
        if (!(this.location.toString() in this.wall)) {
          this.wall[this.location.toString()] = {}
        }

        if (id.toString() in this.wall[this.location.toString()]) {
          Object.assign(this.wall[this.location.toString()], { [id.toString()]: valuesLocal })
        } else {
          this.wall[this.location.toString()][id.toString()] = valuesLocal
        }

        this.replaceDataObject("Pared", this.location.toString(), this.wall[this.location.toString()])
        // n49

        /* Fin */

      }

    });


    if (values.length > 0) {

      this.uwall["capas"] = values;

      this.service.postUWall(this.uwall).subscribe(uWallResult => {

        //UV - set value
        let wallUV = document.getElementById("pared" + this.toTitleCase(this.location) + "UV") as HTMLElement | null
        wallUV.textContent = "Valor U: " + parseFloat(uWallResult["u"].toString()).toFixed(2) + " [W/m2-K]"

        //Accomplishment - set value
        let wallAccomplishment = document.getElementById("pared" + this.toTitleCase(this.location) + "Cumplimiento") as HTMLElement | null
        wallAccomplishment.textContent = uWallResult["cumple"]

        if(uWallResult["cumple"].toString() == "CUMPLE") {
          wallAccomplishment.classList.replace("badge-default","badge-success")
          wallAccomplishment.classList.replace("badge-danger","badge-success")
        } else {
          wallAccomplishment.classList.replace("badge-default","badge-danger")
          wallAccomplishment.classList.replace("badge-success","badge-danger")
        }

        this.replaceData("pared" + this.toTitleCase(this.location) + "UV", parseFloat(uWallResult["u"].toString()).toFixed(2))

      })

    }

  }

  replaceData(id, value) {
    this.summary.replaceData(id, value);
  }

  replaceDataObject(idOut, idIn, value) {
    this.summary.replaceDataObject(idOut, idIn, value)
  }

  //https://stackblitz.com/edit/angular-ivy-6bt4hk?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.tsng

  addRowLayerWall() {

    let count = this.layers.length
    this.layers.push({ idx: count + 1 });

    this.service.getWallMaterials().subscribe((response) => {

      var data = Object.entries(response).map((objt) => {
        return { "text": objt[1]["material"], "value": objt[1]["id"] }
      });

      var configs = {
        default: {
          data: data
        }
      }

      new Selectr((document.getElementById("selectorParedMaterial" + this.toTitleCase(this.location) + (count + 1).toString()) as any), configs.default)

    });

  }

  resetOutput() {

    //U - value to zero
    let wallUV = document.getElementById("pared" + this.toTitleCase(this.location) + "UV") as HTMLElement | null
    wallUV.textContent = "Valor U: 0.0 [W/m2-K]"

    // Accomplishment
    let wallCompliance = document.getElementById("pared" + this.toTitleCase(this.location) + "Cumplimiento") as HTMLElement | null
    wallCompliance.textContent = "SIN VALOR"

    // Accomplishment - reset
    wallCompliance.classList.replace("badge-success","badge-default")
    wallCompliance.classList.replace("badge-danger","badge-default")
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
