import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityModel } from '../interface/city-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  PROXY = "https://cors-anywhere.herokuapp.com/"

  URL_CITY = "http://146.190.159.73/cities"
  URL_CITY_ID = "http://146.190.159.73/cities/id/";
  URL_ZONES = "http://146.190.159.73/cities";
  URL_WALL_MATERIALS = "http://146.190.159.73/wallMaterials";
  URL_WALL_MATERIALS_ID = "http://146.190.159.73/wallMaterials/id/";

  URL_UV = " http://146.190.159.73:80/uv"

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

}
