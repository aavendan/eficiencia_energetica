import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SummaryService } from "../../../provider/summary.service";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {

  result: any;
  generalAccomplishment: boolean;
  subscription: Subscription;
  @Input() simulation: any;

  constructor(private summary: SummaryService) {
    this.summary.getResult().subscribe(result => { 
      this.result = result; 
      const cumplimientos = [
        result.paredFrontalCumplimiento,
        result.paredPosteriorCumplimiento,
        result.paredLateralCumplimiento,
        result.techoCumplimiento,
        result.ventanaFrontalCumplimiento,
        result.ventanaPosteriorCumplimiento,
        result.ventanaLateralCumplimiento,
        result.puertaFrontalCumplimiento,
        result.pisoCumplimiento,
        result.techoCumplimiento
      ];
      if (cumplimientos.includes("NO CUMPLE")) {
        this.generalAccomplishment = false;
      } else if (cumplimientos.includes("CUMPLE")) {
        this.generalAccomplishment = true;
      } else { 
        this.generalAccomplishment = null;
      }
    });
  }

  ngOnInit(): void {
  }

  printResult() {
    window.print();
  }

}
