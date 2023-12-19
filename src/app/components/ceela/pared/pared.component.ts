import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

import Selectr from "mobius1-selectr";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-pared',
  templateUrl: './pared.component.html',
  styleUrls: ['./pared.component.scss']
})
export class ParedComponent implements OnInit {

  wall: any = {};
  layers = [];
  wallMaterials: any[] = [];
  uwall: any;
  loadingProject: boolean = false;

  @Input() location: string;
  

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {

    this.resetOutput();

    this.loadWallMaterials();
    this.fillInputOnLoad();
    // U: preparing zona
    this.summary.getResult().subscribe(result => {
      this.uwall = {
        "zona": result["selectorZona"]
      }
    })

  }

  async loadWallMaterials() {
    const response = await lastValueFrom(this.service.getWallMaterials()) as any[];
    this.wallMaterials = response;
  }

  fillInputOnLoad() {
    const loading$ = this.summary.getLoading().subscribe(async ([prevLoading, loading]) => {
      if (prevLoading && !loading) { // Project loaded
        this.loadingProject = true;
        const {
          Pared: {
            [this.location]: capas
          } = {}
        } = this.summary.getResultSnapshot();
        if (!capas) return;

        if (!this.wallMaterials.length) {
          await this.loadWallMaterials();
        }
        for(const id in capas) {
          await this.addRowLayerWall(capas[id].nombre);
          const espesorRef = document.getElementById("inputParedEspesor" + this.toTitleCase(this.location) + id) as HTMLInputElement;
          espesorRef.setAttribute("value", capas[id].espesor || 0);
        }
        loading$.unsubscribe();
        this.loadingProject = false;
      }
    });
  }

  onChange(location: string, id: string, materialId: string) {
    this.service.getWallMaterialsId(materialId).subscribe((response) => {
      let selectrConductividad = document.getElementById("inputParedConductividad" + this.toTitleCase(location) + id) as HTMLInputElement | null
      selectrConductividad.value = response["k"]

      let selectrDensidad = document.getElementById("inputParedDensidad" + this.toTitleCase(location) + id) as HTMLInputElement | null
      selectrDensidad.value = response["d"]

      let selectrCalor = document.getElementById("inputParedCalor" + this.toTitleCase(location) + id) as HTMLInputElement | null
      selectrCalor.value = response["c"]

      this.onChangeEspesor();
    })
  }

  onChangeEspesor() {

    this.resetOutput();

    let values = [];
    const summaryObject:any = {};

    this.layers.forEach(obj => {

      let id = obj.idx

      let materialRef = document.getElementById("selectorParedMaterial" + this.toTitleCase(this.location) + id.toString()) as HTMLSelectElement
      let espesorRef = document.getElementById("inputParedEspesor" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement
      let conductividadRef = document.getElementById("inputParedConductividad" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement
      let densidadRef = document.getElementById("inputParedDensidad" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement
      let calorRef = document.getElementById("inputParedCalor" + this.toTitleCase(this.location) + id.toString()) as HTMLInputElement

      let materialText = materialRef.options[materialRef.selectedIndex]?.text || "";
      let espesorValue = parseFloat(espesorRef.value)
      let conductividadValue = parseFloat(conductividadRef.value)
      let densidadValue = parseFloat(densidadRef.value)
      let calorValue = parseFloat(calorRef.value)

      if (espesorValue != 0 && conductividadValue != 0) {
        values.push({ "e": espesorValue, "k": conductividadValue })

        /* Inicio */
        const valuesLocal = {
          "nombre": materialText,
          "espesor": espesorValue,
          "k": conductividadValue,
          "densidad": densidadValue,
          "cp": calorValue
        }

        summaryObject[id.toString()] = valuesLocal
        // n49
        if (!(this.location.toString() in this.wall)) {
          this.wall[this.location.toString()] = {}
        }

        if (id.toString() in this.wall[this.location.toString()]) {
          Object.assign(this.wall[this.location.toString()], { [id.toString()]: valuesLocal })
        } else {
          this.wall[this.location.toString()][id.toString()] = valuesLocal
        }

        // n49

        /* Fin */

      }

    });

    this.replaceDataObject("Pared", this.location, summaryObject);

    if (values.length > 0) {

      this.uwall["capas"] = values;

      this.service.postUWall(this.uwall).subscribe(uWallResult => {
        this.setUValue(uWallResult["u"]);
        this.setCumplimiento(uWallResult["cumple"]);
      })

    }
  }

  setUValue(u:number) {
    const nodeId = "pared" + this.toTitleCase(this.location) + "UV";
    const wallUV = document.getElementById(nodeId) as HTMLElement | null;
    const value = parseFloat(u.toString()).toFixed(2);
    wallUV.textContent = "Valor U: " + value + " [W/m2-K]";
    this.replaceData(nodeId, value);
  }

  setCumplimiento(cumplimiento:string) {
    const nodeId = "pared" + this.toTitleCase(this.location) + "Cumplimiento";
    const wallCumplimiento = document.getElementById(nodeId) as HTMLElement | null;
    wallCumplimiento.textContent = cumplimiento;
    this.replaceData(nodeId, cumplimiento);

    if (cumplimiento == "CUMPLE") {
      wallCumplimiento.classList.replace("badge-default","badge-success")
      wallCumplimiento.classList.replace("badge-danger","badge-success")
    } else if (cumplimiento == "NO CUMPLE") {
      wallCumplimiento.classList.replace("badge-default","badge-danger")
      wallCumplimiento.classList.replace("badge-success","badge-danger")
    } else { // Sin Valor
      wallCumplimiento.classList.replace("badge-success","badge-default")
      wallCumplimiento.classList.replace("badge-danger","badge-default")
    }
  }

  replaceData(id, value) {
    if (this.loadingProject) return;
    this.summary.replaceData(id, value);
  }

  replaceDataObject(idOut, idIn, value) {
    if (this.loadingProject) return;
    this.summary.replaceDataObject(idOut, idIn, value)
  }

  //https://stackblitz.com/edit/angular-ivy-6bt4hk?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.tsng

  addRowLayerWall(selectedValue?) {
    return new Promise<void>((resolve, reject) => {
      try {
        const count = this.layers.length;
        this.layers.push({ idx: count + 1 });
    
        const data = this.wallMaterials.map((objt) => ({
          text: objt.material,
          value: objt.id,
          selected: objt.material === selectedValue
        }));
        setTimeout(() => { // Wait to rerender
          const selectId = "selectorParedMaterial" + this.toTitleCase(this.location) + (count + 1);
          new Selectr((document.getElementById(selectId) as any), { data });
          resolve();
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
    
  }

  removeRowLayerWall(idx: number) {
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

  resetOutput() {
    this.setUValue(0);
    this.setCumplimiento("SIN VALOR");
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
