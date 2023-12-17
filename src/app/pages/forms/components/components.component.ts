import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";
import { CityModel } from '../../../interface/city-model';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import noUiSlider from "nouislider";
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;
import Quill from "quill";
import Selectr from "mobius1-selectr";
import { lastValueFrom } from "rxjs";

@Component({
  selector: "app-components",
  templateUrl: "components.component.html"
})
export class FormsComponentsComponent implements OnInit {
  


  locations: string[] = ["frontal", "posterior", "izquierda", "derecha"];

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  // @ViewChild('zones') zones!: ElementRef;

  selectr2:any;
  value: number = 0;

  result: any;

  constructor(private service: DataService, private summary: SummaryService ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

    this.summary.getResult().subscribe(result => { 
      this.result = result; 
      this.value = result.simulationResult;
    });
  }

  ngOnInit() {}

  simulate() {
    const values = this.buildSimulateInput();
    this.service.postSimulate(values).subscribe(result => {
      this.summary.replaceData("simulationResult", result);
    });
  }

  save() {
    const projectName = this.result?.nombreProyecto;
    if (!projectName) {
      alert("Ingrese el nombre del proyecto");
      return;
    }
    const project = {
      input: this.buildSimulateInput(),
      output: this.result?.simulationResult
    };
    lastValueFrom(
      this.service.postSaveProject(projectName, project)
    );
  }

  buildSimulateInput() {
    return {
      "Proyecto" : {
        "nombre": this.result?.nombreProyecto,
        "propietario": {
          "cedula": this.result?.inputPropietarioCI,
          "nombre": this.result?.inputPropietarioNombre
        },
        "tecnico": {
          "cedula": this.result?.inputTecnicoCI,
          "nombre": this.result?.inputTecnicoNombre
        },
        "ubicacion": {
          "ciudad": this.result?.selectorCiudad,
          "zona": this.result?.selectorZona
        }
      },
      "General": {
        "tipo de vivienda": this.result?.inputTipo,
        "dimensiones": {
          "fachada": parseFloat(this.result?.inputLongitudFachada),
          "profundidad": parseFloat(this.result?.inputLongitudProfundidad),
          "area": parseFloat(this.result?.inputArea),
          "altura": parseFloat(this.result?.inputAltura)
        }
      },
      "Pared": this.parseMultiUbiLayers(this.result?.Pared),
      "Techo": this.parseLayers(this.result?.Techo),
      "Piso": this.parseLayers(this.result?.Piso),
      "Ventana": this.parseVentana(this.result?.Ventana)
    };
  }

  parseMultiUbiLayers(object: any) {
    const result = {};
    for (const [key, value] of Object.entries(object || {})) {
      result[key] = this.parseLayers(value as any);
    }
    return this.parseEmptyObject(result);
  }

  parseLayers(layers: any[]) {
    const result = {};
    let numLayers = 0;
    for (const value of Object.values(layers || {})) {
      if (value && value.espesor) {
        numLayers++;
        result[numLayers] = value;
      }
    }
    return this.parseEmptyObject(result);
  }

  parseVentana(ventana: any) {
    const result = {};
    for (const [key, value] of Object.entries(ventana || {})) {
      if (
        value &&
        value["nombre"] !== "Sin ventana" &&
        value["area"]
      ) {
        result[key] = value;
      }
    }
    return this.parseEmptyObject(result);
  }

  parseEmptyObject(object: any) {
    for (const [key, value] of Object.entries(object || {})) {
      if (!value) {
        delete object[key];
      }
    }
    return Object.keys(object || {}).length > 0 ? object : undefined;
  }
}
