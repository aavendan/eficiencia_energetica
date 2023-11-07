import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-ventana',
  templateUrl: './ventanas.component.html',
  styleUrls: ['./ventanas.component.scss']
})
export class VentanasComponent implements OnInit {

  @Input() location: string;

  uwindow: any;
  window: any = {};

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {

    this.resetOutput();

    // U: preparing zona
    this.summary.getResult().subscribe(result => {
      this.uwindow = {
        "zona": result["selectorZona"]
      }
    })
    

    this.addVentana()

  }

  onChange(location: string, materialId: string) {

    this.service.getWindowMaterialsId(materialId).subscribe((result) => {

      let windowUV = document.getElementById("ventana"+this.toTitleCase(this.location)+"UV") as HTMLElement | null
      windowUV.textContent = "Valor U: " +parseFloat(result["u"].toString()).toFixed(2)+" [W/m2-K]"

      let windowSHGC = document.getElementById("ventana"+this.toTitleCase(this.location)+"SHGC") as HTMLElement | null
      windowSHGC.textContent = "SGHC: " +parseFloat(result["sghc"].toString()).toFixed(2)+" [-]"

      /* Inicio */
      let valuesLocal = {
      }

      //FALTA n49

      /* Fin */

      this.replaceData("ventana" + this.toTitleCase(this.location) + "UV", parseFloat(result["u"].toString()).toFixed(2))

    });
    

  }

  onChangeArea() {

  }


  resetOutput() {

    //U - value to zero
    let windowUV = document.getElementById("ventana"+this.toTitleCase(this.location)+"UV") as HTMLElement | null
    windowUV.textContent = "Valor U: 0.0 [W/m2-K]"

    //SRI - value to zero
    let windowSHGC = document.getElementById("ventana"+this.toTitleCase(this.location)+"SHGC") as HTMLElement | null
    windowSHGC.textContent = "SGHC: 0.00 [-]"

    // Accomplishment
    let windowCompliance = document.getElementById("ventana"+this.toTitleCase(this.location)+"Cumplimiento") as HTMLElement | null
    windowCompliance.textContent = "SIN VALOR"

    // Accomplishment - reset
    windowCompliance.classList.replace("badge-success","badge-default")
    windowCompliance.classList.replace("badge-danger","badge-default")
  }

  addVentana() {
    this.service.getWindowMaterials().subscribe((response) => { 

      var data = Object.entries(response).map((objt) =>  {
        return {"text": objt[1]["material"],"value": objt[1]["id"]}
      });

      var configs = {
        default: {
          data: data
        }
      }

      new Selectr((document.getElementById("selectorVentanaTipo"+this.toTitleCase(this.location)) as any), configs.default)
      
    });
  }

  replaceData(id, value) {
    this.summary.replaceData(id, value);
  }

  replaceDataObject(idOut, idIn, value) {
    this.summary.replaceDataObject(idOut, idIn, value)
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
