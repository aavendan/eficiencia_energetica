import { Component, OnInit } from '@angular/core';
import { SummaryService } from "../../../provider/summary.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  focus9;
  focus10;
  focus11;
  focus12;

  options = [
    {
      "text": "Vivienda de una planta",
      "value": "unica"
    },
    {
      "text": "Vivienda de dos plantas",
      "value": "dos"
    },
    {
      "text": "Vivienda en altura",
      "value": "altura"
    }
  ]

  constructor(private summary: SummaryService) { }

  ngOnInit(): void {
    this.fillInputOnLoad();
  }

  fillInputOnLoad() {
    const loading$ = this.summary.getLoading().subscribe(([prevLoading, loading]) => {
    console.log("hola???")

      if (prevLoading && !loading) { // Project loaded
        const result = this.summary.getResultSnapshot();
        const {
          inputTipo, inputLongitudFachada, inputLongitudProfundidad, inputArea, inputAltura
        } = result;
        
        document.getElementById("inputLongitudFachada").setAttribute("value", inputLongitudFachada);
        document.getElementById("inputLongitudProfundidad").setAttribute("value", inputLongitudProfundidad);
        document.getElementById("inputArea").setAttribute("value", inputArea);
        document.getElementById("inputAltura").setAttribute("value", inputAltura);

        const radioButtonTypes: any = document.getElementsByName("inputTipo");
        radioButtonTypes.forEach(radioButton => {
          if (radioButton.value === result.inputTipo) {
            radioButton.setAttribute("checked", "true");
          }
        });
        loading$.unsubscribe();
      }
    });
  }

  addData(id, value) {
    this.summary.replaceData(id, value);
  }

}
