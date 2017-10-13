import { Component } from '@angular/core';

import { MidiService } from './midi.service';

@Component({
  selector: 'app-midiselector',
  templateUrl: './midiselector.component.html',
  styleUrls: ['./midiselector.component.css'],
  providers: [MidiService]
})
export class AppMidiSelector {
    inDevices: string[];

    constructor(private midiService: MidiService) {
        //inDevices = midiService.
    };

    faderChange(e): void {
        this.midiService.send("Hello");
    };
}
