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
  }

  addData(id, value) {
    this.summary.replaceData(id, value);
  }

}
