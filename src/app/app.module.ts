import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppFaderH } from './app.fader-h';
import { AngularDraggableDirective } from './draggable.directive';
import { ControllerPanel } from "./controllerpanel.component";
import { SvgKnob } from "./knob.svgcomponent";
import { MidiSelector } from "./midiselector.component";

@NgModule({
	declarations: [
		AppComponent,
		AppFaderH,
		AngularDraggableDirective,
		ControllerPanel,
		SvgKnob,
		MidiSelector
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
