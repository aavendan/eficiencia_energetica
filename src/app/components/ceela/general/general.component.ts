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
      "text": "Planta única",
      "value": "unica"
    },
    {
      "text": "Dos plantas",
      "value": "dos"
    },
    {
      "text": "En Altura",
      "value": "altura"
    }
  ]

  constructor(private summary: SummaryService) { }

  ngOnInit(): void {
  }

  addData(id, value) {
    this.summary.replaceValue(id, value);
  }

}
