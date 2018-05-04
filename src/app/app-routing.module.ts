import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OeeDataComponent } from './oeeData/oeeData.component';
import {AddOeeDataComponent} from './addOeeData/addOeeData.component';
const appRoutes: Routes = [
    { path: '/angularTemplate/OEE-Data-Center', component: OeeDataComponent },
    { path: '/angularTemplate/Add-OEE-Data', component: AddOeeDataComponent },
    { path: '',   redirectTo: '/angularTemplate/Add-OEE-Data', pathMatch: 'full' }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        {
          enableTracing: false, // <-- debugging purposes only 
        }
      )
    ],
    exports: [
      RouterModule
    ],
    providers: [      
    ]
  })
  export class AppRoutingModule { }