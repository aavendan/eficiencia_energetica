import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityModel } from '../interface/city-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_CITY = "https://energyplus-a3d2c-default-rtdb.firebaseio.com/cities.json";
  URL_ZONES = "https://energyplus-a3d2c-default-rtdb.firebaseio.com/zones.json";

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get(this.URL_CITY);
  }

  getZones() {
    return this.http.get(this.URL_ZONES);
  }
}
