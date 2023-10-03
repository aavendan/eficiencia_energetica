import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
