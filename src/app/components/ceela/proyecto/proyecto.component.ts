import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../provider/data.service";

import Selectr from "mobius1-selectr";

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;

  selectr2:any;

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getCities().subscribe((response) => { 
      
      var data = Object.entries(response).map((objt) =>  {
        return {"text": objt[1]["city"],"value": objt[1]["id"]}
      });

      var configs = {
        default: {
          data: data
        }
      }

      new Selectr((document.getElementById("selectr") as any), configs.default)

    });

    this.service.getZones().subscribe((response) => { 

      let data = Object.entries(response)
                        .map(item => item[1]["zc_label"] )
                        .filter((name, index, currentVal) => currentVal.indexOf(name) === index )
                        .map(txt =>  {
                          return {"text": txt,"value": txt}
                        });
     
      var configs = {
        default: {
          data: data
        }
      }

      this.selectr2 = new Selectr((document.getElementById("selectr2") as any), configs.default)

    });
  }

  onChange(id) {
    this.service.getCitiesId(id).subscribe(response => {
      
      this.selectr2.setValue(response["zc_label"])

    })
  }

}
