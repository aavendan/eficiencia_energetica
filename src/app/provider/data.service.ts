import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityModel } from '../interface/city-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  IP = "http://143.198.69.86"

  PROXY = "https://cors-anywhere.herokuapp.com/"

  URL_CITY = this.IP + "/cities"
  URL_CITY_ID = this.IP + "/cities/id/";
  URL_ZONES = this.IP + "/cities";
  URL_WALL_MATERIALS = this.IP + "/wallMaterials";
  URL_WALL_MATERIALS_ID = this.IP + "/wallMaterials/id/";

  URL_UV = this.IP + "/uv"

  URL_SIMULATOR = this.IP + "/simulacion"

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get(this.URL_CITY);
  }

  getCitiesId(id: string) {
    return this.http.get(this.URL_CITY_ID + id);
  }

  getZones() {
    return this.http.get(this.URL_ZONES);
  }

  getWallMaterials() {
    return this.http.get(this.URL_WALL_MATERIALS);
  }

  getWallMaterialsId(id: string) {
    return this.http.get(this.URL_WALL_MATERIALS_ID + id);
  }

  postUV(values: any){
    return this.http.post(this.URL_UV, values)
  }

  postSimulate() {

    let values = {
      "Proyecto" : {
        "nombre": "ambiensa",
        "propietario": {
          "cedula": "",
          "nombre": ""
        },
        "tecnico": {
          "cedula": "",
          "nombre": ""
        },
        "ubicacion": {
          "ciudad": "",
          "zona": ""
        }
      },
      "General": {
        "tipo de vivienda": "",
        "dimensiones": {
          "fachada": 6,
          "profundidad": 10,
          "area": 0,
          "altura": 3
        }
      },
      "Pared": {
        "frontal": {
          "1": {
            "nombre": "Adobe 1600 kg/m3",
            "espesor": 2,
            "k": 0.95,
            "densidad": 1600,
            "cp": 920
          },
          "2": {
            "nombre": "Adobe 1300 kg/m3",
            "espesor": 1.5,
            "k": 0.58,
            "densidad": 1280,
            "cp": 850
          }
        },
        "posterior": {
          "1": {
            "nombre": "Adobe 1600 kg/m3",
            "espesor": 2,
            "k": 0.95,
            "densidad": 1600,
            "cp": 920
          },
          "2": {
            "nombre": "Adobe 1300 kg/m3",
            "espesor": 1.5,
            "k": 0.58,
            "densidad": 1280,
            "cp": 850
          }
        },
        "izquierda": {
          "1": {
            "nombre": "Adobe 1600 kg/m3",
            "espesor": 2,
            "k": 0.95,
            "densidad": 1600,
            "cp": 920
          },
          "2": {
            "nombre": "Adobe 1300 kg/m3",
            "espesor": 1.5,
            "k": 0.58,
            "densidad": 1280,
            "cp": 850
          }
        },
        "derecha": {
          "1": {
            "nombre": "Adobe 1600 kg/m3",
            "espesor": 2,
            "k": 0.95,
            "densidad": 1600,
            "cp": 920
          },
          "2": {
            "nombre": "Adobe 1300 kg/m3",
            "espesor": 1.5,
            "k": 0.58,
            "densidad": 1280,
            "cp": 850
          }
        }
      },
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

    return this.http.post(this.URL_SIMULATOR, values)
  }

}
