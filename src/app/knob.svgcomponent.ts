import { Component, Input } from '@angular/core';

@Component({
  selector: '[svg-knob]',
  template: `	<svg:svg viewBox="0 0 100 100">
					<svg:g [attr.transform]="knobtransform()">
						<svg:circle cx="50" cy="50" r="48" stroke="darkgrey" stroke-width="4" fill="lightgrey"
							(mousedown)="svgMouseDown($event)"
							(Dmousemove)="svgMouseMove($event)"
							(Dmouseup)="svgMouseUp($event)"
							(mouse-wheel-up)="mouseWheelUp($event)"
							(mouse-wheel-down)="mouseWheelDown($event)"/>
						<svg:line x1="50" y1="10" x2="50" y2="20" stroke-width="5" stroke="black"/>
					</svg:g>
				</svg:svg>`
})
export class SvgKnob {
	value: number = 0;
	minAngle: number = -145;
	maxAngle: number = 145;
	sensitivity: number = 0.005;
	angle: number = -145;
	origX: number = 0;
	origY: number = 0;

	mm = this.svgMouseMove.bind(this);
	mu = this.svgMouseUp.bind(this);


	constructor() {
	}

	knobtransform() : string {
		return "rotate("+this.angle+" 50 50)";
	}


	svgMouseDown(e: MouseEvent) {
		console.log("MouseDown");

		this.origX = e.pageX;
		this.origY = e.pageY;
		document.addEventListener('mousemove', this.mm);
		document.addEventListener('mouseup', this.mu);
	}

	svgMouseMove(e: MouseEvent) {
		if (this.origX != 0) {
			//var dist = (e.pageX - this.origX) + (this.origY - e.pageY);
			var delta = e.movementX - e.movementY;
			this.value += delta * this.sensitivity;

			// Limit to one rotation.
			if (this.value < 0) this.value = 0;
			else if (this.value > 1) this.value = 1;
			this.angle = this.minAngle + this.value * (this.maxAngle - this.minAngle);
			//console.log("Value = ", this.value);
		}
	}
	svgMouseUp() {
		//console.log("MouseUp");

		this.origX = 0;
		document.removeEventListener('mousemove', this.mm);
		document.removeEventListener('mouseup', this.mu);
	}
	mouseWheelUp() {
	}
	mouseWheelDown() {
	}
}
