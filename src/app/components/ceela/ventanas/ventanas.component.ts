import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

import Selectr from "mobius1-selectr";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-ventana',
  templateUrl: './ventanas.component.html',
  styleUrls: ['./ventanas.component.scss']
})
export class VentanasComponent implements OnInit {

  @Input() location: string;

  uwindow: any;
  wwrInput: any = {};
  window: any = {};
  wwr: number = 0;
  summaryObject: any = {};
  materials: any[] = [];
  windowMaterials: any[] = [];
  selectrVentana: any;

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {

    this.resetOutput();

    // U: preparing zona
    this.summary.getResult().subscribe(result => {
      this.uwindow = {
        "zona": result["selectorZona"]
      }
      const l1 = result["inputAltura"] || 0;
      let l2: number;
      if (["frontal", "posterior"].includes(this.location)) {
        l2 = result["inputLongitudFachada"] || 0;
      } else {
        l2 = result["inputLongitudProfundidad"] || 0;
      };

      if (l1 != this.wwrInput.l1 || l2 != this.wwrInput.l2) {
        this.wwrInput.l1 = l1;
        this.wwrInput.l2 = l2;
        this.changeWWR();
      }
    })
    
    this.addVentana();
    this.fillInputOnLoad();
  }

  async loadWindowMaterials() {
    const response = await lastValueFrom(this.service.getWindowMaterials()) as any[];
    this.windowMaterials = response;
  }

  fillInputOnLoad() {
    const loading$ = this.summary.getLoading().subscribe(async ([prevLoading, loading]) => {
      if (prevLoading && !loading) { // Project loaded
        const {
          Ventana: {
            [this.location]: info
          } = {}
        } = this.summary.getResultSnapshot();
        if (!info) return;

        if (!this.selectrVentana) {
          await (new Promise(resolve => setTimeout(resolve, 1000)));
        }
        const { id } = this.windowMaterials.find(material => material.material === info.nombre) || {};
        if (id) {
          this.selectrVentana.setValue(id);
        }
        const espesorRef = document.getElementById("inputVentanaArea" + this.toTitleCase(this.location) ) as HTMLInputElement;
        espesorRef.setAttribute("value", info.area || 0);
        loading$.unsubscribe();
      }
    });
  }

  onChange(location: string, materialId: string) {
    this.summaryObject.nombre = this.windowMaterials.find((material) => material.id == materialId).material;
    this.service.getWindowMaterialsId(materialId).subscribe(async (result) => {

      let windowSHGC = document.getElementById("ventana"+this.toTitleCase(this.location)+"SHGC") as HTMLElement | null
      windowSHGC.textContent = "SGHC: " +parseFloat(result["sghc"].toString()).toFixed(2)+" [-]"
      this.summaryObject.sghc = result["sghc"];

      const uwindow$ = this.service.postUWindow({
        zona: this.uwindow["zona"],
        u: result["u"],
      })
      const uwindow = await lastValueFrom(uwindow$);
      let windowUV = document.getElementById("ventana"+this.toTitleCase(this.location)+"UV") as HTMLElement | null
      windowUV.textContent = "Valor U: " +parseFloat(uwindow["u"].toString()).toFixed(2)+" [W/m2-K]"

      this.summaryObject.u = uwindow["u"];
      this.summaryObject.accomplishment = uwindow["cumple"];

      let windowAccomplishment = document.getElementById("ventana" + this.toTitleCase(this.location) + "Cumplimiento") as HTMLElement | null

      if (uwindow["u"] != 0) {
        windowAccomplishment.textContent = uwindow["cumple"]
  
        if(uwindow["cumple"].toString() == "CUMPLE") {
          windowAccomplishment.classList.replace("badge-default","badge-success")
          windowAccomplishment.classList.replace("badge-danger","badge-success")
        } else {
          windowAccomplishment.classList.replace("badge-default","badge-danger")
          windowAccomplishment.classList.replace("badge-success","badge-danger")
        }
      } else {
        windowAccomplishment.textContent = "SIN VALOR"
        windowAccomplishment.classList.replace("badge-success","badge-default")
        windowAccomplishment.classList.replace("badge-danger","badge-default")
      }

      /* Inicio */
      let valuesLocal = {
      }

      //FALTA n49

      /* Fin */

      this.replaceData("ventana" + this.toTitleCase(this.location) + "UV", parseFloat(result["u"].toString()).toFixed(2))

      this.summary.replaceDataObject("Ventana", this.location, this.summaryObject);
    });
    

  }

  async onChangeArea(area: number) {
    this.wwrInput.area = Number(area);
    await this.changeWWR();

    this.summaryObject.area = Number(area);
    this.summaryObject.wwr = this.wwr;
    this.summary.replaceDataObject("Ventana", this.location, this.summaryObject);
  }

  async changeWWR() {
    const { l1, l2, area } = this.wwrInput;
    if ([l1, l2, area].some((value) => !value)) {
      this.wwr = 0;
      return;
    }
    const wwr$ = this.service.postWWR(this.wwrInput);
    const wwr = await lastValueFrom(wwr$) || 0;
    this.wwr = parseFloat((wwr * 100).toFixed(2));
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

  async addVentana(selectedValue?) {
    await this.loadWindowMaterials();

    const data = this.windowMaterials.map((objt) => ({
      text: objt.material,
      value: objt.id,
      selected: selectedValue === objt.material
    }));

    const selectId = "selectorVentanaTipo" + this.toTitleCase(this.location);
    this.selectrVentana = new Selectr((document.getElementById(selectId) as any), { data });
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
