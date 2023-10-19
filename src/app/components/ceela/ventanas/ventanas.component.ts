import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-ventana',
  templateUrl: './ventanas.component.html',
  styleUrls: ['./ventanas.component.scss']
})
export class VentanasComponent implements OnInit {

  @Input() location: string;

  constructor(private service: DataService) { }

  ngOnInit(): void {

    let ventanaUV = document.getElementById("ventana"+this.toTitleCase(this.location)+"UV") as HTMLElement | null
    ventanaUV.textContent = "Valor U: 0.0 [W/m2-K]"

    let ventanaSHGC = document.getElementById("ventana"+this.toTitleCase(this.location)+"SHGC") as HTMLElement | null
    ventanaSHGC.textContent = "SGHC: 0.00 [-]"

    this.service.getWindowMaterials().subscribe((response) => { 

      var data = Object.entries(response).map((objt) =>  {
        return {"text": objt[1]["material"],"value": objt[1]["id"]}
      });

      var configs = {
        default: {
          data: data
        }
      }

      new Selectr((document.getElementById("selectorVentanaTipo"+this.toTitleCase(this.location)) as any), configs.default)
      
    });

  }

  onChange(location: string, materialId: string) {

    this.service.getWindowMaterialsId(materialId).subscribe((result) => {

      let ventanaUV = document.getElementById("ventana"+this.toTitleCase(this.location)+"UV") as HTMLElement | null
      ventanaUV.textContent = "Valor U: " +parseFloat(result["u"].toString()).toFixed(2)+" [W/m2-K]"

      let ventanaSHGC = document.getElementById("ventana"+this.toTitleCase(this.location)+"SHGC") as HTMLElement | null
      ventanaSHGC.textContent = "SGHC: " +parseFloat(result["sghc"].toString()).toFixed(2)+" [-]"

      this.onChangeArea();

    });
    

  }

  onChangeArea() {

  }


  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
