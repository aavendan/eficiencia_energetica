import { Routes } from "@angular/router";

import { FormsComponentsOldComponent } from "./componentsold/componentsold.component";
import { FormsComponentsComponent } from "./components/components.component";
import { ElementsComponent } from "./elements/elements.component";
import { ValidationComponent } from "./validation/validation.component";

export const FormsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "simulator",
        component: FormsComponentsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "old",
        component: FormsComponentsOldComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "elements",
        component: ElementsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "validation",
        component: ValidationComponent
      }
    ]
  }
];
