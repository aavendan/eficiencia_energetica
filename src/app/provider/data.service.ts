import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
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
  URL_WINDOW_MATERIALS = this.IP + "/windowMaterials";
  URL_WINDOW_MATERIALS_ID = this.IP + "/windowMaterials/id/";
  URL_WALL_MATERIALS = this.IP + "/wallMaterials";
  URL_WALL_MATERIALS_ID = this.IP + "/wallMaterials/id/";
  URL_ROOF_MATERIALS = this.IP + "/roofMaterials";
  URL_ROOF_MATERIALS_ID = this.IP + "/roofMaterials/id/";

  URL_UWALL = this.IP + "/upared";
  URL_UCEILING = this.IP + "/utecho";
  URL_UFLOOR = this.IP + "/upiso";
  URL_UWINDOW = this.IP + "/uventana";
  URL_WWR = this.IP + "/wwr";
  URL_PROJECTS = this.IP + "/projects/";
  URL_DOWNLOAD_PROJECTS = this.IP + "/projects/download/";

  URL_SIMULATOR = this.IP + "/simulacion"

  cache: any = {};

  wallMaterialsPromise: Promise<any>;
  windowMaterialsPromise: Promise<any>;
  roofMaterialsPromise: Promise<any>;

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get(this.URL_CITY);
  }

  getCitiesId(id: string) {
    return this.http.get(this.URL_CITY_ID + id);
  }

  getZones(): Observable<any> {
    return this.http.get(this.URL_ZONES);
  }

  getWallMaterials() {
    return this.http.get(this.URL_WALL_MATERIALS);
  }

  getWallMaterialsAsync() {
    if (this.wallMaterialsPromise) {
      return this.wallMaterialsPromise;
    }
    this.wallMaterialsPromise = lastValueFrom(this.getWallMaterials());
    return this.wallMaterialsPromise;
  }

  getWallMaterialsId(id: string) {
    return this.http.get(this.URL_WALL_MATERIALS_ID + id);
  }

  getWindowMaterials() {
    return this.http.get(this.URL_WINDOW_MATERIALS);
  }

  getWindowMaterialsAsync() {
    if (this.windowMaterialsPromise) {
      return this.windowMaterialsPromise;
    }
    this.windowMaterialsPromise = lastValueFrom(this.getWindowMaterials());
    return this.windowMaterialsPromise;
  }

  getWindowMaterialsId(id: string) {
    return this.http.get(this.URL_WINDOW_MATERIALS_ID + id);
  }

  getRoofMaterials() {
    return this.http.get(this.URL_ROOF_MATERIALS);
  }

  getRoofMaterialsAsync() {
    if (this.roofMaterialsPromise) {
      return this.roofMaterialsPromise;
    }
    this.roofMaterialsPromise = lastValueFrom(this.getRoofMaterials());
    return this.roofMaterialsPromise;
  }

  getRoofMaterialsId(id: string) {
    return this.http.get(this.URL_ROOF_MATERIALS_ID + id);
  }

  async getProjectsAsync() {
    const projects = await lastValueFrom(this.http.get(this.URL_PROJECTS)) as any[];
    this.cache.projects = {};
    projects.forEach(project => {
      this.cache.projects[project.name] = project;
    });
    return projects;
  }

  async getProjectAsync(name: string) {
    if (this.cache.projects?.[name]) {
      return this.cache.projects[name];
    }
    const project = await lastValueFrom(this.http.get(this.URL_PROJECTS + name)) as any;
    this.cache.projects ||= {};
    this.cache.projects[name] = project;
    return project;
  }

  postUWall(values: any){
    return this.http.post(this.URL_UWALL, values)
  }

  postUCeiling(values: any){
    return this.http.post(this.URL_UCEILING, values)
  }

  postUFloor(values: any){
    return this.http.post(this.URL_UFLOOR, values)
  }

  postUWindow(values: any){
    return this.http.post(this.URL_UWINDOW, values)
  }

  postWWR(values: any){
    return this.http.post(this.URL_WWR, values) as Observable<number>
  }

  postSimulate(values: any) {
    return this.http.post(this.URL_SIMULATOR, values)
  }

  async saveProjectAsync(name: string, value: any) {
    return lastValueFrom(this.http.put(this.URL_PROJECTS + name, value));
  }

  async deleteProjectAsync(name: string) {
    return lastValueFrom(this.http.delete(this.URL_PROJECTS + name));
  }

  async downloadProject(name: string) {
    try {
      const file = await lastValueFrom(this.http.get(this.URL_DOWNLOAD_PROJECTS + name, { responseType: 'blob' }));
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = name + '.zip';
      link.click();
    } catch (error) {
      if (error.error instanceof Blob) {
        const message = await error.error.text();
        const parsedMessage = JSON.parse(message);
        throw new Error(parsedMessage);
      }
      throw error;
    }
  }
}
