import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparkAlertComponent } from './components/sprk-alert/sprk-alert.component';
import { SparkButtonComponent } from './components/sprk-button/sprk-button.component';
import { SparkLinkComponent } from './components/sprk-link/sprk-link.component';
import { SparkIconSetComponent } from './components/sprk-icon-set/sprk-icon-set.component';
import { SparkIconComponent } from './components/sprk-icon/sprk-icon.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SparkAlertComponent,
    SparkButtonComponent,
    SparkLinkComponent,
    SparkIconSetComponent,
    SparkIconComponent
  ],
  exports: [
    SparkAlertComponent,
    SparkButtonComponent,
    SparkLinkComponent,
    SparkIconSetComponent,
    SparkIconComponent
  ],
})
export class SparkCoreAngularModule { }
