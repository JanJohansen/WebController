import { Component, Input } from '@angular/core';

@Component({
	selector: 'controller-panel',
	template: `	<svg:svg viewBox="0 0 250 250">
					<circle cx="50" cy="50" r="50" stroke="green" stroke-width="0.1" fill="none" />
					<svg:svg viewBox="0 0 250 250" width="100px" height="100px">
						<circle cx="50" cy="50" r="40" stroke="green" stroke-width="2" fill="none" />
					</svg:svg >
					<svg:svg svg-knob width="50px" height="50px"/>
				</svg:svg >`,
	styles: [`
      :host {
      }
    `]
	//styleUrls: ['./app.component.css']
})
export class ControllerPanel {
	_name = "";

	//constructor(private midiService: MidiService) { }

	//@Input() msg: string;

	@Input()
	set fadername(name: string) {
	}
	get fadername(): string { return this._name; }

	change(e): void {
	};
}
