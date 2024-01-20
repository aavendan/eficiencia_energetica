import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/provider/data.service';
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
  error: string = '';
  imgProject: string = 'assets/img/formReferences/3.4VentanasGeneral.jpg';
  @Input() simulation: any;

  constructor(private summary: SummaryService, private api: DataService) {
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
        result.techoCumplimiento,
        result.techoSRICumplimiento,
      ];
      if (cumplimientos.includes("NO CUMPLE")) {
        this.generalAccomplishment = false;
      } else if (cumplimientos.includes("CUMPLE")) {
        this.generalAccomplishment = true;
      } else { 
        this.generalAccomplishment = null;
      }
      console.log("inputTipo", result.inputTipo);
      const imageMap = {
        "Vivienda de una planta": 'assets/img/formReferences/2.1TipoVivienda01.jpg',
        "Vivienda de dos plantas": 'assets/img/formReferences/2.1TipoVivienda02.jpg',
        "Vivienda en altura": 'assets/img/formReferences/2.1TipoVivienda03.jpg',
      };
      console.log("Aaa", imageMap[result.inputTipo])
      this.imgProject = imageMap[result.inputTipo] || this.imgProject;
    });
  }

  ngOnInit(): void {
  }

  printResult() {
    window.print();
  }

  async download() {
    try {
      await this.api.downloadProject(this.result.nombreProyecto);
    } catch (error) {
      this.error = error.message;
    }
  }
}
