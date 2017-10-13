import { Component } from '@angular/core';

import { MidiService } from './midi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MidiService]
})
export class AppComponent {
    title = 'MiX!';

    constructor(private midiService: MidiService) { };

    faderChange(e): void {
        this.midiService.send("Hello");
    };
}
