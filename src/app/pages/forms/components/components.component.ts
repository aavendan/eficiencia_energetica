import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";
import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: "app-components",
  templateUrl: "components.component.html"
})
export class FormsComponentsComponent implements OnInit {

  locations: string[] = ["frontal", "posterior", "izquierda", "derecha"];
  confort: number = 0;
  energia: number = 0;
  result: any;
  isLoading: boolean = false;
  error: string = "";

  constructor(
    private service: DataService,
    private summary: SummaryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.summary.getResult().subscribe(result => {
      this.result = result;
      this.confort = result.simulationResult?.confort || 0;
      this.energia = result.simulationResult?.energia || 0;
      const tabTecho = document.getElementById("tabTecho");
      const tabPiso = document.getElementById("tabPiso");
      if (result?.inputTipo === "Vivienda en altura") {
        tabTecho?.parentElement.classList.add("disabled");
        tabPiso?.parentElement.classList.add("disabled");
      } else {
        tabTecho?.parentElement.classList.remove("disabled");
        tabPiso?.parentElement.classList.remove("disabled");
      }
    });
    const projectName = this.router.parseUrl(this.router.url).queryParams["name"];
    if (projectName) {
      this.loadProject(projectName);
    } else {
      this.summary.clearMessages();
    }
  }

  async loadProject(projectName: string) {
    this.summary.setLoading(true);
    const project = await this.service.getProjectAsync(projectName);
    if (!project) {
      alert("No se encontró el proyecto");
      return;
    }
    this.summary.setResult(this.parseSavedProject(project));
    this.summary.setLoading(false);
  }

  simulate() {
    this.isLoading = true;
    const values = this.buildSimulateInput();
    this.service.postSimulate(values).subscribe(result => {
      this.summary.replaceData("simulationResult", result);
      this.save();
      this.isLoading = false;
    }, error => {
      this.error = error.error;
      // window.alert(error.error);
      this.isLoading = false;
    })
  }

  async save() {
    const projectName = this.result?.nombreProyecto;
    if (!projectName) {
      alert("Ingrese el nombre del proyecto");
      return;
    }
    const project = {
      input: {
        ...this.buildSimulateInput(),
        Calculated: this.parseCalculatedValues(this.result)
      },
      output: this.result?.simulationResult
    };
    await this.service.saveProjectAsync(projectName, project);
  }

  buildSimulateInput() {
    const {
      nombreProyecto, inputPropietarioCI, inputPropietarioNombre,
      inputTecnicoCI, inputTecnicoNombre, selectorCiudad, selectorZona,
      inputTipo, inputLongitudFachada, inputLongitudProfundidad, inputArea,
      inputAltura, Pared, Techo, Piso, Ventana
    } = this.result || {};
    return {
      Proyecto : {
        nombre: nombreProyecto,
        propietario: {
          cedula: inputPropietarioCI,
          nombre: inputPropietarioNombre
        },
        tecnico: {
          cedula: inputTecnicoCI,
          nombre: inputTecnicoNombre
        },
        ubicacion: {
          ciudad: selectorCiudad,
          zona: selectorZona
        }
      },
      General: {
        "tipo de vivienda": inputTipo,
        dimensiones: {
          fachada: parseFloat(inputLongitudFachada),
          profundidad: parseFloat(inputLongitudProfundidad),
          area: parseFloat(inputArea),
          altura: parseFloat(inputAltura)
        }
      },
      Pared: this.parseMultiUbiLayers(Pared),
      Techo: this.parseLayers(Techo),
      Piso: this.parseLayers(Piso),
      Ventana: this.parseVentana(Ventana)
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

  parseCalculatedValues(source: any) {
    const {
      paredDerechaUV, paredIzquierdaUV, paredFrontalUV, paredPosteriorUV,
      paredDerechaCumplimiento, paredIzquierdaCumplimiento, paredFrontalCumplimiento, paredPosteriorCumplimiento,
      ventanaDerechaUV, ventanaIzquierdaUV, ventanaFrontalUV, ventanaPosteriorUV,
      ventanaDerechaCumplimiento, ventanaIzquierdaCumplimiento, ventanaFrontalCumplimiento, ventanaPosteriorCumplimiento,
      ventanaDerechaSHGC, ventanaIzquierdaSHGC, ventanaFrontalSHGC, ventanaPosteriorSHGC,
      ventanaDerechaSHGCCumplimiento, ventanaIzquierdaSHGCCumplimiento, ventanaFrontalSHGCCumplimiento, ventanaPosteriorSHGCCumplimiento,
      techoUV, techoCumplimiento, techoSRI, techoSRICumplimiento, pisoUV, pisoCumplimiento,
    } = source || {};

    return {
      paredDerechaUV, paredIzquierdaUV, paredFrontalUV, paredPosteriorUV,
      paredDerechaCumplimiento, paredIzquierdaCumplimiento, paredFrontalCumplimiento, paredPosteriorCumplimiento,
      ventanaDerechaUV, ventanaIzquierdaUV, ventanaFrontalUV, ventanaPosteriorUV,
      ventanaDerechaCumplimiento, ventanaIzquierdaCumplimiento, ventanaFrontalCumplimiento, ventanaPosteriorCumplimiento,
      ventanaDerechaSHGC, ventanaIzquierdaSHGC, ventanaFrontalSHGC, ventanaPosteriorSHGC,
      ventanaDerechaSHGCCumplimiento, ventanaIzquierdaSHGCCumplimiento, ventanaFrontalSHGCCumplimiento, ventanaPosteriorSHGCCumplimiento,
      techoUV, techoCumplimiento, techoSRI, techoSRICumplimiento, pisoUV, pisoCumplimiento,
    };
  }

  parseEmptyObject(object: any) {
    for (const [key, value] of Object.entries(object || {})) {
      if (!value) {
        delete object[key];
      }
    }
    return Object.keys(object || {}).length > 0 ? object : undefined;
  }

  parseSavedProject(project: any) {
    const {
      Proyecto: {
        nombre: nombreProyecto,
        propietario: {
          cedula: inputPropietarioCI,
          nombre: inputPropietarioNombre
        } = <any> {},
        tecnico: {
          cedula: inputTecnicoCI,
          nombre: inputTecnicoNombre
        } = <any> {},
        ubicacion: {
          ciudad: selectorCiudad,
          zona: selectorZona
        } = <any> {}
      } = <any> {},
      General: {
        "tipo de vivienda": inputTipo,
        dimensiones: {
          fachada: inputLongitudFachada,
          profundidad: inputLongitudProfundidad,
          area: inputArea,
          altura: inputAltura
        } = <any> {}
      } = <any> {},
      Pared,
      Techo,
      Piso,
      Ventana,
    } = project.input || {};

    return {
      nombreProyecto,
      inputPropietarioCI,
      inputPropietarioNombre,
      inputTecnicoCI,
      inputTecnicoNombre,
      selectorCiudad,
      selectorZona,
      inputTipo,
      inputLongitudFachada,
      inputLongitudProfundidad,
      inputArea,
      inputAltura,
      Pared,
      Techo,
      Piso,
      Ventana,
      simulationResult: project.output,
      ...this.parseCalculatedValues(project.input?.Calculated)
    };
  }
}
