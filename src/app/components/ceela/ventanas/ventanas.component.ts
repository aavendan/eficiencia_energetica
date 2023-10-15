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

    let ventanaUV = document.getElementById("inputVentanaUV"+this.toTitleCase(this.location)) as HTMLElement | null
    ventanaUV.textContent = "Valor U: 0.0 [W/m2-K]"

    let ventanaSHGC = document.getElementById("inputVentanaSHGC"+this.toTitleCase(this.location)) as HTMLElement | null
    ventanaSHGC.textContent = "SGHC 0.00 [-]"

    this.service.getWindowMaterials().subscribe((response) => { 
      
      var data = Object.entries(response).map((objt) =>  {
        return {"text": objt[1]["material"],"value": objt[1]["id"], "u": objt[1]["u"] , "sghc": objt[1]["sghc"]}
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
    // alert(location + " " +materialId)

    // let ventanaUV = document.getElementById("ventanaUV"+this.toTitleCase(this.location)) as HTMLElement | null
    // ventanaUV.textContent = "Valor U: " +parseFloat(result.toString()).toFixed(2)+" [W/m2-K]"

    // let ventanaRef = document.getElementById("selectorVentanaTipo"+this.toTitleCase(this.location)) as HTMLSelectElement
    // let ventanaText = ventanaRef.options[ventanaRef.selectedIndex].text

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
