import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MidiService {

	private midi: any = null;
	public outputs = [];
    public inputs = [];


    onCC = new EventEmitter();

    constructor() {
        if (navigator["requestMIDIAccess"]) {
            navigator["requestMIDIAccess"]({
                sysex: true
            }).then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
        } else {
            alert("No MIDI support in your browser.");
        }
    };

    onMIDIFailure(e) {
        console.log(e);
    }

    onMIDISuccess(midiAccess) {
        this.midi = midiAccess;
        console.log('MIDI Access Object', this.midi);

        var noteon;
        var noteoff;

        // Create array of all available devices
        var iter = this.midi.outputs.values();
        for (var i = iter.next(); i && !i.done; i = iter.next()) {
            this.outputs.push(i.value);
        }
        iter = this.midi.inputs.values();
        for (var i = iter.next(); i && !i.done; i = iter.next()) {
            this.inputs.push(i.value);
        }

        // Debug output to console.
        for (let i = 0; i < this.inputs.length; i++) {
            console.log("In (" + i + "):", this.inputs[i].name);
        }
        for (let i = 0; i < this.outputs.length; i++) {
            console.log("Out (" + i + "):", this.outputs[i].name);
        }

        this.inputs[2].onmidimessage = this.onMIDIMessage.bind(this);

        // Craft 'note on' and 'note off' messages (channel 3, note number 60 [C3], max velocity)
//        noteon = [0x92, 60, 127];
//        noteoff = [0x82, 60, 127];

        // Send the 'note on' and schedule the 'note off' for 1 second later
/*        outputs[0].send(noteon);
        setTimeout(
            function () {
                outputs[0].send(noteoff);
            },
            1000
        );
*/
    }

    onMIDIMessage(event) {
        var data = event.data;
        //console.log("msg received", event);

        var channel = (data[0] & 0x0f) + 1;
        var type = data[0] & 0xf0;
        if (type == 0xB0) {
            var cc = data[1];
            var value = data[2];
            console.log("d?c" + channel + "cc" + cc + "v" + value);
            //this.onCC.emit(cc.toString(), value);
        } else if (type == 0x90) {
            var note = data[1];
            var velocity = data[2];
            console.log("d?c" + channel + "on" + note + "v" + velocity);
        } else if(type == 0x80) {
            var note = data[1];
            var velocity = data[2];
            console.log("d?c" + channel + "of" + note + "v" + velocity);
        }
    }
    
    send(msg): void {
        console.log("MidiSend(" + msg + ")");
    };
}
