import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";
import { CityModel } from '../../../interface/city-model';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import noUiSlider from "nouislider";
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;
import Quill from "quill";
import Selectr from "mobius1-selectr";

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
    });
  }

  ngOnInit() {
    
    // https://www.tektutorialshub.com/angular/select-options-example-in-angular/
    // https://codepen.io/Mobius1/pen/QgdpLN

    // var quill = new Quill("#dirtel", {
    //   modules: {
    //     toolbar: [
    //       ["bold", "italic"],
    //       ["link", "blockquote", "code"],
    //       [
    //         {
    //           list: "ordered"
    //         },
    //         {
    //           list: "bullet"
    //         }
    //       ]
    //     ]
    //   },
    //   placeholder: "Dirección/Teléfono",
    //   theme: "snow"
    // });

    // var optionsMultiple = { multiple: true };
    // var selectrmultiple: any = document.getElementById("selectr-multiple");
    // var selectorMultiple = new Selectr(selectrmultiple, optionsMultiple);

    // var c: any = document.getElementById("input-slider"),
    //   d = document.getElementById("input-slider-value");

    // noUiSlider.create(c, {
    //   start: 100,
    //   connect: [true, false],
    //   //step: 1000,
    //   range: {
    //     min: 100,
    //     max: 500
    //   }
    // }),
    //   c.noUiSlider.on("update", function(a, b) {
    //     d.textContent = a[b];
    //   });

    // var c1: any = document.getElementById("input-slider-range"),
    //   d1 = document.getElementById("input-slider-range-value-low"),
    //   e = document.getElementById("input-slider-range-value-high"),
    //   f = [d1, e];

    // noUiSlider.create(c1, {
    //   start: [
    //     parseInt(d1.getAttribute("data-range-value-low")),
    //     parseInt(e.getAttribute("data-range-value-high"))
    //   ],
    //   connect: !0,
    //   range: {
    //     min: parseInt(c1.getAttribute("data-range-value-min")),
    //     max: parseInt(c1.getAttribute("data-range-value-max"))
    //   }
    // }),
    //   c1.noUiSlider.on("update", function(a, b) {
    //     f[b].textContent = a[b];
    //   });

    // // this variable is to delete the previous image from the dropzone state
    // // it is just to make the HTML DOM a bit better, and keep it light
    // let currentSingleFile = undefined;
    // // single dropzone file - accepts only images
    // new Dropzone(document.getElementById("dropzone-single"), {
    //   url: "/",
    //   thumbnailWidth: null,
    //   thumbnailHeight: null,
    //   previewsContainer: document.getElementsByClassName(
    //     "dz-preview-single"
    //   )[0],
    //   previewTemplate: document.getElementsByClassName("dz-preview-single")[0]
    //     .innerHTML,
    //   maxFiles: 1,
    //   acceptedFiles: "image/*",
    //   init: function() {
    //     this.on("addedfile", function(file) {
    //       if (currentSingleFile) {
    //         this.removeFile(currentSingleFile);
    //       }
    //       currentSingleFile = file;
    //     });
    //   }
    // });
    // document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
    // // this variable is to delete the previous image from the dropzone state
    // // it is just to make the HTML DOM a bit better, and keep it light
    // let currentMultipleFile = undefined;
    // // multiple dropzone file - accepts any type of file
    // new Dropzone(document.getElementById("dropzone-multiple"), {
    //   url: "https://",
    //   thumbnailWidth: null,
    //   thumbnailHeight: null,
    //   previewsContainer: document.getElementsByClassName(
    //     "dz-preview-multiple"
    //   )[0],
    //   previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
    //     .innerHTML,
    //   maxFiles: null,
    //   acceptedFiles: null,
    //   init: function() {
    //     this.on("addedfile", function(file) {
    //       if (currentMultipleFile) {
    //       }
    //       currentMultipleFile = file;
    //     });
    //   }
    // });
    // document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";

   


    
  }

  simulate() {

    // {
    //   "frontal": {
    //     "1": {
    //       "nombre": "Adobe 1600 kg/m3",
    //       "espesor": 2,
    //       "k": 0.95,
    //       "densidad": 1600,
    //       "cp": 920
    //     },
    //     "2": {
    //       "nombre": "Adobe 1300 kg/m3",
    //       "espesor": 1.5,
    //       "k": 0.58,
    //       "densidad": 1280,
    //       "cp": 850
    //     }
    //   },
    //   "posterior": {
    //     "1": {
    //       "nombre": "Adobe 1600 kg/m3",
    //       "espesor": 2,
    //       "k": 0.95,
    //       "densidad": 1600,
    //       "cp": 920
    //     },
    //     "2": {
    //       "nombre": "Adobe 1300 kg/m3",
    //       "espesor": 1.5,
    //       "k": 0.58,
    //       "densidad": 1280,
    //       "cp": 850
    //     }
    //   },
    //   "izquierda": {
    //     "1": {
    //       "nombre": "Adobe 1600 kg/m3",
    //       "espesor": 2,
    //       "k": 0.95,
    //       "densidad": 1600,
    //       "cp": 920
    //     },
    //     "2": {
    //       "nombre": "Adobe 1300 kg/m3",
    //       "espesor": 1.5,
    //       "k": 0.58,
    //       "densidad": 1280,
    //       "cp": 850
    //     }
    //   },
    //   "derecha": {
    //     "1": {
    //       "nombre": "Adobe 1600 kg/m3",
    //       "espesor": 2,
    //       "k": 0.95,
    //       "densidad": 1600,
    //       "cp": 920
    //     },
    //     "2": {
    //       "nombre": "Adobe 1300 kg/m3",
    //       "espesor": 1.5,
    //       "k": 0.58,
    //       "densidad": 1280,
    //       "cp": 850
    //     }
    //   }
    // }

    let values = {
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
      "Pared": this.result?.Pared,
      "Techo": {
        "1": {
            "nombre": "Teja Fibrocemento",
            "espesor": 3,
            "k": 1,
            "densidad": 1120,
            "cp": 1000,
            "absorcion": 0.7
          }
        
      },
      "Piso": {
        "1": {
            "nombre": "Losa de Hormigon Pisos",
            "espesor": 5,
            "k": 1.63,
            "densidad": 2400,
            "cp": 1050
          }
        
      },
      "Ventana": {
        "frontal": {
          "1": {
            "nombre": "",
            "area": 0,
            "wwr": 0,
            "u": 0,
            "sghc": 0
          }
        }
      }
    }

    // console.log(values)

    this.service.postSimulate(values).subscribe(result => {

       this.value = (result as number)
     })
  }
}
