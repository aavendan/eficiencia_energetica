import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { FormsComponentsOldComponent } from "./componentsold/componentsold.component";
import { FormsComponentsComponent } from "./components/components.component";
import { ElementsComponent } from "./elements/elements.component";
import { ValidationComponent } from "./validation/validation.component";

import { FormInfoComponent } from '../../components/form-info/form-info.component';
import { ProyectoComponent } from "../../components/ceela/proyecto/proyecto.component";
import { GeneralComponent } from "../../components/ceela/general/general.component";
import { ParedComponent } from "../../components/ceela/pared/pared.component";
import { TechoComponent } from "../../components/ceela/techo/techo.component";
import { PisosComponent } from '../../components/ceela/pisos/pisos.component';
import { VentanasComponent } from '../../components/ceela/ventanas/ventanas.component';
import { ResultadoComponent } from '../../components/ceela/resultado/resultado.component';

import { RouterModule } from "@angular/router";
import { FormsRoutes } from "./forms.routing";
import { ProjectsComponent } from './projects/projects.component';
@NgModule({
  declarations: [
    FormsComponentsComponent,
    FormsComponentsOldComponent,
    ElementsComponent,
    ValidationComponent,
    ProyectoComponent,
    GeneralComponent,
    ParedComponent,
    TechoComponent,
    PisosComponent,
    VentanasComponent,
    ResultadoComponent,
    ProjectsComponent,
    FormInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormsRoutes),
    FormsModule,
    TagInputModule,
    NgxDatatableModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ]
})
export class FormsModules {}
