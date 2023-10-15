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
  URL_WINDOOW_MATERIALS = this.IP + "/windowMaterials";
  URL_WINDOOW_MATERIALS_ID = this.IP + "/windowMaterials/id/";
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

  getWindowMaterials() {
    return this.http.get(this.URL_WINDOOW_MATERIALS);
  }

  getWindowMaterialsId(id: string) {
    return this.http.get(this.URL_WINDOOW_MATERIALS_ID + id);
  }

  postUV(values: any){
    return this.http.post(this.URL_UV, values)
  }

  postSimulate(values) {
    return this.http.post(this.URL_SIMULATOR, values)
  }

}
