import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'accomplishment',
  templateUrl: './accomplishment.component.html',
  styleUrls: ['./accomplishment.component.scss']
})
export class AccomplishmentComponent implements OnInit {

  badgeClass: string = "";
  @Input() value: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value.currentValue !== changes.value.previousValue) {
      if (this.value === "CUMPLE") {
        this.badgeClass = "badge-success";
      } else if (this.value === "NO CUMPLE") {
        this.badgeClass = "badge-danger";
      }
    }
  }

}
