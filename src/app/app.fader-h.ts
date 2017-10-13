import { Component, Input } from '@angular/core';

import { MidiService } from './midi.service';

@Component({
    selector: 'app-fader-h',
    template: '<input type="range" min="0" max="127" value="42" class="slider" id="myRange" on-input="change($event)" >',
    styles: [`
      :host {
      }
      .slider {
          -webkit-appearance: none;  /* Override default CSS styles */
          appearance: none;
          width: 100%; /* Full-width */
          height: 10px; /* Specified height */
          background: #111111; /* Grey background */
          outline-style: single;
          outline-color: black;
          outline-width: thick;
          opacity: 1; /* Set transparency (for mouse-over effects on hover) */
          -webkit-transition: .2s; /* 0.2 seconds transition on hover */
          transition: opacity .2s;
      }
      .slider::-webkit-slider-thumb {
          -webkit-appearance: none; /* Override default look */
          appearance: none;
          width: 120px; /* Set a specific slider handle width */
          height: 56px; /* Slider handle height */
          background: url('assets/FaderBlack_H.bmp');
          cursor: pointer; /* Cursor on hover */
      }
    `]
    //styleUrls: ['./app.component.css']
})
export class AppFaderH {
    _name = "<no-name>";
    min = 0;
    max = 127;
    value = 42;
    width = 200;

    constructor(private midiService: MidiService) { }

    @Input() msg: string;
    @Input() style;
    

    @Input()
    set fadername(name: string) {
        this._name = (name && name.trim()) || '<no name set>';
    }
    get fadername(): string { return this._name; }

    change(e): void {
        this.value = e.target.value;
        //console.log("EY!", e.target.value);
        this.midiService.send(this.msg + "=" + this._name + ", " + this.value);
    };

    // d1c1sx
}
