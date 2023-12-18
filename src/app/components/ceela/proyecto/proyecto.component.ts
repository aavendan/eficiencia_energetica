import { Component, OnInit, Output } from '@angular/core';
import { DataService } from "../../../provider/data.service";
import { SummaryService } from "../../../provider/summary.service";


import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;


  selectrCuidad: any;
  selectrZone:any;


  cities: any[] = [];
  zones: any[] = [];

  constructor(private service: DataService, private summary: SummaryService) { }

  ngOnInit(): void {
    this.loadCitiesAndZones();
    this.fillInputOnLoad();
  }

  fillInputOnLoad() {
    const loading$ = this.summary.getLoading().subscribe(([prevLoading, loading]) => {
      if (prevLoading && !loading) { // Project loaded
        const result = this.summary.getResultSnapshot();
        const {
          nombreProyecto, selectorCiudad, selectorZona, inputPropietarioNombre,
          inputTecnicoNombre, inputPropietarioCI, inputTecnicoCI
        } = result;

        document.getElementById("nombreProyecto").setAttribute("value", nombreProyecto || "");
        document.getElementById("inputPropietarioCI").setAttribute("value", inputPropietarioCI || "");
        document.getElementById("inputPropietarioNombre").setAttribute("value", inputPropietarioNombre || "");
        document.getElementById("inputTecnicoNombre").setAttribute("value", inputTecnicoNombre || "");
        document.getElementById("inputTecnicoCI").setAttribute("value", inputTecnicoCI || "");

        if (this.selectrCuidad) {
          const { id } = this.cities.find(city => city.city === selectorCiudad) || {};
          if (id) {
            this.selectrCuidad.setValue(id);
          }
        }
        if (selectorZona) {
          this.selectrZone?.setValue(selectorZona);
        }
      }
      loading$.unsubscribe();
    });
  }

  loadCitiesAndZones() {
    this.service.getCities().subscribe((response) => {
      this.cities = response;
      const result = this.summary.getResultSnapshot();

      const citiesOptions = Object.entries(response).map((objt) =>  {
        const option:any = {"text": objt[1]["city"],"value": objt[1]["id"]}
        if (objt[1]["city"] === result.selectorCiudad) {
          option.selected = true;
        }
        return option
      });
      this.selectrCuidad = new Selectr((document.getElementById("selectorCiudad") as any), {
        data: citiesOptions
      });

      const zonesOptions = [...new Set(response.map(city => city.zc_label))].map((zone) =>  {
        const option:any = {"text": zone,"value": zone}
        if (zone === result.selectorZona) {
          option.selected = true;
        }
        return option
      });
      this.selectrZone = new Selectr((document.getElementById("selectorZona") as any), {
        data: zonesOptions
      });
    });
  }

  // Deprecated, it loads cities again
  loadZones() {
    this.service.getZones().subscribe((response) => { 

      let data = Object.entries(response)
                        .map(item => item[1]["zc_label"] )
                        .filter((name, index, currentVal) => currentVal.indexOf(name) === index )
                        .map(txt =>  {
                          return {"text": txt,"value": txt}
                        });
      const configs = {
        default: {
          data: data
        }
      }
      this.selectrZone = new Selectr((document.getElementById("selectorZona") as any), configs.default)
    });
  }

  onChange(event) {
    let text = event.target.options[event.target.options.selectedIndex].text;

    this.addData(event.target.id, text);

    const zone = this.cities.find(city => city.city === text)?.zc_label;
    this.selectrZone?.setValue(zone);
  }

  addData(id, value) {
    this.summary.replaceData(id, value);
  }

}
