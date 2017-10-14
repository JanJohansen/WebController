import { Component } from '@angular/core';

import { MidiService } from './midi.service';

@Component({
  selector: 'midi-selector',
  templateUrl: './midiselector.component.html',
  styleUrls: ['./midiselector.component.css'],
  providers: [MidiService]
})
export class MidiSelector {
	inDevices = [];
	outDevices = [];

	constructor(private midiService: MidiService) {
		this.inDevices = midiService.inputs;
		this.outDevices = midiService.outputs;
    }

	inSelected(event) {
		console.log("evt:", event);
		//localStorage.midiInDeviceName = ;
	}

	outSelected(event) {

	}
}
