import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pisos',
  templateUrl: './pisos.component.html',
  styleUrls: ['./pisos.component.scss']
})
export class PisosComponent implements OnInit {

  editing = {};
  rows = [
    {
      "capa": "Capa 1",
      "espesor": 1.0
    },
    {
      "capa": "Capa 2",
      "espesor": 7.0
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

}
