import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SummaryService } from "../../../provider/summary.service";

import swal from "sweetalert2";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {

  result: any;
  subscription: Subscription;
  @Input() simulation: number;

  constructor(private summary: SummaryService) {
    this.summary.getResult().subscribe(result => { 
      this.result = result; 
    });
   }

  ngOnInit(): void {
  }

  basicSwal() {
    swal.fire({
      title: "Resultados",
      text: "Imprimiendo resultados de la simulación",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-primary"
      }
    });
  }

}
