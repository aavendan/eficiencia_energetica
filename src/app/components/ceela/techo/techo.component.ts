import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";

import Selectr from "mobius1-selectr";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-techo',
  templateUrl: './techo.component.html',
  styleUrls: ['./techo.component.scss']
})
export class TechoComponent implements OnInit {

  focus1;
  focus2;

  layers = []
  roofMaterials: any[] = [];
  loadingProject: boolean = false;
  isSavedProject: boolean = false;
  loadedCalculated: boolean = false;
  absSolarEditableLayer: number = -1;
  fistChange: boolean = true;

  loading$ = null;
  uceiling: any;
  ceiling: any = {};

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {
    this.loadRoofMaterials();
    this.fillInputOnLoad();
    // U: preparing zona
    this.summary.getResult().subscribe(result => {
      this.uceiling = {
        "zona": result["selectorZona"]
      }
    })
    
  }

  ngOnDestroy() {
    this.loading$?.unsubscribe();
  }

  async loadRoofMaterials() {
    this.roofMaterials = await this.service.getRoofMaterialsAsync();
  }

  fillInputOnLoad() {
    this.loading$ = this.summary.getLoading().subscribe(async ([prevLoading, loading]) => {
      if (prevLoading && !loading) { // Project loaded

        const { Techo } = this.summary.getResultSnapshot();
        if (!Techo ) return;
        this.loadingProject = true;
        this.isSavedProject = true;

        if (!this.roofMaterials.length) {
          await this.loadRoofMaterials();
        }
        for(const id in Techo) {
          await this.addRowLayerCeiling(Techo[id].nombre);
          const espesorRef = document.getElementById("inputTechoEspesor" + id) as HTMLInputElement;
          espesorRef.setAttribute("value", Techo[id].espesor || 0);
          const absorbanciaRef = document.getElementById("inputTechoAbsortancia" + + id.toString()) as HTMLInputElement;
          absorbanciaRef.value = Techo[id].absorcion || 0;
        }
        this.onChangeEspesor();

        this.loading$.unsubscribe();
        this.loadingProject = false;
      }
    });
  }

  onChange(id: string, materialId: string) {
    const material = this.roofMaterials.find(material => material.id == materialId);
    const selectrConductividad = document.getElementById("inputTechoConductividad"+id) as HTMLInputElement | null
    selectrConductividad.value = material["k"]

    const selectrDensidad = document.getElementById("inputTechoDensidad"+id) as HTMLInputElement | null
    selectrDensidad.value = material["d"]

    const selectrCalor = document.getElementById("inputTechoCalor"+id) as HTMLInputElement | null
    selectrCalor.value = material["c"]

    if (this.fistChange && this.isSavedProject) {
      this.fistChange = false;
      return;
    }

    const selectrAbsortancia = document.getElementById("inputTechoAbsortancia"+id) as HTMLInputElement | null
    selectrAbsortancia.value = material["a"]

    if (!this.isSavedProject || this.loadedCalculated) {
      this.onChangeEspesor();
    }
  }

  onChangeEspesor() {

    this.resetOutput();

    let values = [];
    const summaryObject = {};
    this.absSolarEditableLayer = -1;
    this.layers.forEach(obj => {

      let id = obj.idx

      let materialRef = document.getElementById("selectorTechoMaterial" +  id.toString()) as HTMLSelectElement
      let espesorRef = document.getElementById("inputTechoEspesor" + id.toString()) as HTMLInputElement
      let conductividadRef = document.getElementById("inputTechoConductividad" + id.toString()) as HTMLInputElement
      let densidadRef = document.getElementById("inputTechoDensidad" + id.toString()) as HTMLInputElement
      let calorRef = document.getElementById("inputTechoCalor" + + id.toString()) as HTMLInputElement
      let absortanciaRef = document.getElementById("inputTechoAbsortancia" + + id.toString()) as HTMLInputElement

      let materialText = materialRef.options[materialRef.selectedIndex]?.text || "";
      let espesorValue = parseFloat(espesorRef.value)
      let conductividadValue = parseFloat(conductividadRef.value)
      let densidadValue = parseFloat(densidadRef.value)
      let calorValue = parseFloat(calorRef.value)
      let absortanciaValue = parseFloat(absortanciaRef.value)

      if (espesorValue != 0 && conductividadValue != 0) {
        if (this.absSolarEditableLayer === -1) {
          this.absSolarEditableLayer = id;
        }
        values.push({
          "e": espesorValue,
          "k": conductividadValue,
          "a": absortanciaValue,
        });

        /* Inicio */
        let valuesLocal = {
          "nombre": materialText,
          "espesor": espesorValue,
          "k": conductividadValue,
          "densidad": densidadValue,
          "cp": calorValue,
          "absorcion": absortanciaValue
        }
        summaryObject[id.toString()] = valuesLocal
        //FALTA n49

        /* Fin */

      }

    });

    this.replaceData("Techo", summaryObject);

    if (this.isSavedProject && !this.loadedCalculated) {
      this.loadedCalculated = true;
      const result = this.summary.getResultSnapshot();
      const uv = result["techoUV"];
      const cumplimiento = result["techoCumplimiento"];
      const sri = result["techoSRI"] || 0;
      const sriCumplimiento = result["techoSRICumplimiento"];

      this.setUValue(uv);
      this.setCumplimiento(cumplimiento);
      this.setSRI(sri);
      this.setSRICumplimiento(sriCumplimiento);
      if (sri) {
        const { Techo } = result;
        if (Techo["1"]) {
          const {absorcion, k} = Techo["1"];
          this.setSRIInfoMessage(absorcion, k);
        }
      }
      return;
    }

    if (values.length > 0) {
      this.uceiling["capas"] = values;
      const [{k, a}] = values;
      this.setSRIInfoMessage(a, k);
      this.service.postUCeiling(this.uceiling).subscribe((uCeilingResult: any) => {
        const {
          u: { valor: uValue, cumple: uCumplimiento },
          sri: { valor: sriValue, cumple: sriCumplimiento },
        } = uCeilingResult;
        this.setUValue(uValue);
        this.setCumplimiento(uCumplimiento);
        this.setSRI(sriValue || 0);
        this.setSRICumplimiento(sriCumplimiento);
      });
    } else {
      this.setSRIInfoMessage();
    }
  }

  onChangeAbsortancia() {}

  setUValue(u:number) {
    const nodeId = "techoUV";
    const nodeUv = document.getElementById(nodeId) as HTMLElement | null;
    const value = parseFloat(u.toString()).toFixed(2);
    nodeUv.textContent = "Valor U: " + value + " [W/m2-K]";
    this.replaceData(nodeId, value);
  }

  setCumplimiento(cumplimiento:string) {
    const nodeId = "techoCumplimiento";
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

  setSRI(sri:number) {
    const nodeId = "techoSRI";
    const nodeSRI = document.getElementById(nodeId) as HTMLElement | null;
    nodeSRI.parentElement.classList.remove("d-none");
    const value = parseFloat(sri.toString()).toFixed(2);
    nodeSRI.textContent = "SRI: " + value + " [-]";
    this.replaceData(nodeId, value);
  }

  setSRIInfoMessage(a?, k?) {
    const nodeId = "form-info-SRI";
    const infoNode = document.getElementById(nodeId);
    let message; 
    if (!a || !k) {
      message = "El valor de SRI es calculado considerando la emisividad superficial y el coeficiente convectivo sobre la superficie";
    } else {
      message = `El valor de SRI es calculado considerando una emisividad superficial de ${a || "0.0"} y un coeficiente convectivo sobre la superficie de ${k || "0.0"} W/m2-K`;
    }
    infoNode.innerHTML = `<p class="text-left">${message}</p>`;
  }

  setSRICumplimiento(cumplimiento: string) {
    const nodeId = "techoSRICumplimiento";
    this.replaceData(nodeId, cumplimiento);

    const nodeCumplimiento = document.getElementById(nodeId) as HTMLElement | null;
    nodeCumplimiento.textContent = cumplimiento;
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

  replaceData(id, value) {
    if (this.loadingProject) return;
    this.summary.replaceData(id, value);
  }

  replaceDataObject(idOut, idIn, value) {
    if (this.loadingProject) return;
    this.summary.replaceDataObject(idOut, idIn, value)
  }

  resetOutput() {
    this.setUValue(0);
    this.setSRI(0);
    this.setCumplimiento("SIN VALOR");
    this.setSRICumplimiento("SIN VALOR");
  }
  addRowLayerCeiling(selectedValue?) {
    return new Promise<void>((resolve, reject) => {
      try {
        const count = this.layers.length
        this.layers.push({ idx: count + 1 });
    
        const data = this.roofMaterials.map((objt) =>  ({
          text: objt.material,
          value: objt.id,
          selected: objt.material === selectedValue
        }));
        setTimeout(() => { // wait to rerender u.u
          const selectId = document.getElementById("selectorTechoMaterial"+(count+1));
          new Selectr(selectId as any, { data });
          resolve();
        });
      } catch (error) {
        reject(error);
      }
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
