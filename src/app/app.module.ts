import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppFaderH } from './app.fader-h';
import { AngularDraggableDirective } from './draggable.directive';


@NgModule({
  declarations: [
      AppComponent,
      AppFaderH,
      AngularDraggableDirective
  ],
  imports: [
      BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
