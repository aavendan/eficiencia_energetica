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
    });
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

        if (!this.selectrVentana) {
          this.addVentana(info.nombre);
        }
        this.onChangeArea(info.area);
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
      this.setUValue(uwindow["u"]);
      // this.setCumplimiento(uwindow["cumple"]);

      this.summaryObject.u = uwindow["u"];
      this.summaryObject.accomplishment = uwindow["cumple"];

      if (uwindow["u"] != 0) {
        this.setCumplimiento(uwindow["cumple"]);
      } else {
        this.setCumplimiento("SIN VALOR");
      }
      this.replaceDataObject("Ventana", this.location, this.summaryObject);
    });
  }

  setUValue(u:number) {
    const nodeId = "ventana"+this.toTitleCase(this.location)+"UV";
    const nodeUv = document.getElementById(nodeId) as HTMLElement | null;
    const value = parseFloat(u.toString()).toFixed(2);
    nodeUv.textContent = "Valor U: " + value + " [W/m2-K]";
    this.replaceData(nodeId, value);
  }

  setCumplimiento(cumplimiento:string) {
    const nodeId = "ventana"+this.toTitleCase(this.location)+"Cumplimiento";
    const nodeCumplimiento = document.getElementById(nodeId) as HTMLElement | null;
    nodeCumplimiento.textContent = cumplimiento;
    this.replaceData(nodeId, cumplimiento);
    if (cumplimiento == "CUMPLE") {
      nodeCumplimiento.classList.replace("badge-default","badge-success")
      nodeCumplimiento.classList.replace("badge-danger","badge-success")
    } else if (cumplimiento == "NO CUMPLE") {
      nodeCumplimiento.classList.replace("badge-default","badge-danger")
      nodeCumplimiento.classList.replace("badge-success","badge-danger")
    } else { // Sin Valor
      nodeCumplimiento.classList.replace("badge-success","badge-default")
      nodeCumplimiento.classList.replace("badge-danger","badge-default")
    }
  }

  async onChangeArea(area: number) {
    this.wwrInput.area = Number(area);
    await this.changeWWR();

    this.summaryObject.area = Number(area);
    this.summaryObject.wwr = this.wwr;
    this.replaceDataObject("Ventana", this.location, this.summaryObject);
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
    this.setUValue(0);
    this.setCumplimiento("SIN VALOR");

    let windowSHGC = document.getElementById("ventana"+this.toTitleCase(this.location)+"SHGC") as HTMLElement | null
    windowSHGC.textContent = "SGHC: 0.00 [-]"
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
