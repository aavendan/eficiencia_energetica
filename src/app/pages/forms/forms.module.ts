import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from 'ngx-bootstrap/tabs';

import { FormsComponentsOldComponent } from "./componentsold/componentsold.component";
import { FormsComponentsComponent } from "./components/components.component";
import { ElementsComponent } from "./elements/elements.component";
import { ValidationComponent } from "./validation/validation.component";

import { ParedComponent } from "../../components/ceela/pared/pared.component";
import { TechoComponent } from "../../components/ceela/techo/techo.component";

import { RouterModule } from "@angular/router";
import { FormsRoutes } from "./forms.routing";
@NgModule({
  declarations: [
    FormsComponentsComponent,
    FormsComponentsOldComponent,
    ElementsComponent,
    ValidationComponent,
    ParedComponent,
    TechoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormsRoutes),
    FormsModule,
    TagInputModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ]
})
export class FormsModules {}
