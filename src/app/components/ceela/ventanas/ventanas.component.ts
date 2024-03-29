import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

import Selectr from "mobius1-selectr";
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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
  isSavedProject: boolean = false;
  loadedUV: boolean = false;
  fistChange: boolean = true;
  loading$ = null;

  constructor(private service: DataService, private summary: SummaryService, private router: Router) { }

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

    const projectName = this.router.parseUrl(this.router.url).queryParams["name"];
    if (projectName) {
      this.fillInputOnLoad();
    } else {
      this.addVentana();
    }
  }

  ngOnDestroy() {
    this.loading$?.unsubscribe();
  }

  async loadWindowMaterials() {
    this.windowMaterials = await this.service.getWindowMaterialsAsync();
  }

  fillInputOnLoad() {
    this.loading$ = this.summary.getLoading().subscribe(async ([prevLoading, loading]) => {
      if (prevLoading && !loading) { // Project loaded
        const {
          Ventana: {
            [this.location]: info
          } = {}
        } = this.summary.getResultSnapshot();
        if (!info) {
          return this.addVentana();
        };
        this.isSavedProject = true;

        if (!this.selectrVentana) {
          await this.addVentana(info.nombre);
        }
        const espesorRef = document.getElementById("inputVentanaArea" + this.toTitleCase(this.location) ) as HTMLInputElement;
        espesorRef.setAttribute("value", info.area || 0);
        await this.onChangeArea(info.area, info.wwr);
        this.loading$.unsubscribe();
      }
    });
  }

  async onChange(location: string, materialId: string) {
    if (this.fistChange) {
      this.fistChange = false;
      return;
    }
    const material = this.windowMaterials.find(material => material.id == materialId);
    this.summaryObject.nombre = material.material;
    this.summaryObject.sghc = material["sghc"];
    this.setSGHCValue(material["sghc"])

    let uwindow;
    let sghcCumplimiento;
    if (this.isSavedProject && !this.loadedUV) {
      this.loadedUV = true;
      const result = this.summary.getResultSnapshot();
      uwindow = {
        u: +result["ventana" + this.toTitleCase(this.location) + "UV"],
        cumple: result["ventana" + this.toTitleCase(this.location) + "Cumplimiento"]
      }
      sghcCumplimiento = result["ventana"+this.toTitleCase(this.location)+"SHGCCumplimiento"];
    } else {
      const uwindow$ = this.service.postUWindow({
        zona: this.uwindow["zona"],
        u: material["u"],
        shgc: material["sghc"]
      })
      const result: any = await lastValueFrom(uwindow$);
      uwindow = {
        u: result.u.valor,
        cumple: result.u.cumple
      };
      sghcCumplimiento = result.shgc.cumple;
    }

    this.setUValue(uwindow["u"]);

    this.summaryObject.u = uwindow["u"];
    this.summaryObject.accomplishment = uwindow["cumple"];
    if (uwindow["u"] != 0) {
      this.setCumplimiento(uwindow["cumple"]);
    } else {
      this.setCumplimiento("SIN VALOR");
    }
    if (material["sghc"] == 0) {
      this.setSGHCumplimiento("SIN VALOR")
    } else {
      this.setSGHCumplimiento(sghcCumplimiento);
    }
    this.replaceDataObject("Ventana", this.location, this.summaryObject);
  }

  setUValue(u:number) {
    const nodeId = "ventana"+this.toTitleCase(this.location)+"UV";
    const nodeUv = document.getElementById(nodeId) as HTMLElement | null;
    const value = parseFloat(u.toString()).toFixed(2);
    nodeUv.textContent = "Valor U: " + value + " [W/m2-K]";
    this.replaceData(nodeId, value);
  }

  setSGHCValue(sghc: number) {
    const nodeId = "ventana"+this.toTitleCase(this.location)+"SHGC";
    const windowSHGC = document.getElementById(nodeId) as HTMLElement | null
    const value = parseFloat(sghc.toString()).toFixed(2);
    windowSHGC.textContent = "SHGC: " + value + " [-]";
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

  setSGHCumplimiento(cumplimiento:string) {
    const nodeId = "ventana"+this.toTitleCase(this.location)+"SHGCCumplimiento";
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

  async onChangeArea(area: number, wwr?: number) {
    this.wwrInput.area = Number(area);
    if (wwr) {
      this.wwr = wwr;
    } else {
      await this.changeWWR();
    }

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
    this.setSGHCValue(0);
    this.setSGHCumplimiento("SIN VALOR");
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
