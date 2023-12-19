import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'accomplishment',
  templateUrl: './accomplishment.component.html',
  styleUrls: ['./accomplishment.component.scss']
})
export class AccomplishmentComponent implements OnInit {

  badgeClass: string = "badge-success";
  @Input() value: any;
  constructor() { }

  ngOnInit(): void {
    if (this.value === "CUMPLE") {
      this.badgeClass = "badge-success";
    } else if (this.value === "NO CUMPLE") {
      this.badgeClass = "badge-danger";
    }
  }

}
