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

import { ParedComponent } from "../../components/ceela/pared/pared.component";
import { TechoComponent } from "../../components/ceela/techo/techo.component";
import { PisosComponent } from '../../components/ceela/pisos/pisos.component';
import { VentanasComponent } from '../../components/ceela/ventanas/ventanas.component';



import { RouterModule } from "@angular/router";
import { FormsRoutes } from "./forms.routing";
@NgModule({
  declarations: [
    FormsComponentsComponent,
    FormsComponentsOldComponent,
    ElementsComponent,
    ValidationComponent,
    ParedComponent,
    TechoComponent,
    PisosComponent,
    VentanasComponent
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
