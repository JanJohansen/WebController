import { Directive, ElementRef, Renderer, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';

@Directive({
    selector: '[ngDraggable]'
})
export class AngularDraggableDirective implements OnInit {
    private allowDrag: boolean = true;
    private moving: boolean = false;
	private startX: number;
	private startY: number;
	private downX: number;
	private downY: number;
    private oldZIndex: string = '';

    @Output() started = new EventEmitter<any>();
    @Output() stopped = new EventEmitter<any>();
    @Output() edge = new EventEmitter<any>();

    @Input() handle: HTMLElement;
    @Input() bounds: HTMLElement;

    @Input() gridSize: number = 10;

    @Input()
    set ngDraggable(setting: any) {
        if (setting !== undefined && setting !== null && setting !== '') {
            this.allowDrag = !!setting;

            let element = this.handle ? this.handle : this.el.nativeElement;

            if (this.allowDrag) {
                this.renderer.setElementClass(element, 'ng-draggable', true);
            }
            else {
                this.renderer.setElementClass(element, 'ng-draggable', false);
            }
        }
    }   

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        if (this.allowDrag) {
            let element = this.handle ? this.handle : this.el.nativeElement;
            this.renderer.setElementClass(element, 'ng-draggable', true);
        }
    }

    private moveTo(x: number, y: number) {
		var newX = x - this.startX + this.downX;
		var newY = y - this.startY + this.downY;

		// Move to grid
		newX = newX - (newX % this.gridSize);
		newY = newY - (newY % this.gridSize);

		// set style!
		this.renderer.setElementStyle(this.el.nativeElement, "left", newX + "px");
		this.renderer.setElementStyle(this.el.nativeElement, "top", newY + "px");
    }

    private pickUp() {
        // get old z-index
        this.oldZIndex = this.el.nativeElement.style.zIndex ? this.el.nativeElement.style.zIndex : '';

        if (window) {
            this.oldZIndex = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("z-index");
        }

        this.renderer.setElementStyle(this.el.nativeElement, 'z-index', '99999');

        if (!this.moving) {
            this.started.emit(this.el.nativeElement);
            this.moving = true;
        }
    }
   
    private putBack() {
        if (this.oldZIndex) {
            this.renderer.setElementStyle(this.el.nativeElement, 'z-index', this.oldZIndex);
        } else {
            this.el.nativeElement.style.removeProperty('z-index');
        }

        if (this.moving) {
            this.stopped.emit(this.el.nativeElement);
            this.moving = false;
        }
    }

    // Support Mouse Events:
    @HostListener('mousedown', ['$event'])
    onMouseDown(event: any) {
        // 1. skip right click;
        // 2. if handle is set, the element can only be moved by handle
        if (event.button == 2 || (this.handle !== undefined && event.target !== this.handle)) {
            return;
        }

		this.startX = event.clientX;
		this.startY = event.clientY;

		this.downX = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("left"));
		this.downY = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("top"));
        this.pickUp();
    }

    @HostListener('document:mouseup')
    onMouseUp() {
        this.putBack();
    }

    @HostListener('document:mouseleave')
    onMouseLeave() {
        this.putBack();
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: any) {
        if (this.moving && this.allowDrag) {
            this.moveTo(event.clientX, event.clientY);
        }
    }

    // Support Touch Events:
    @HostListener('document:touchend')
    onTouchEnd() {
        this.putBack();
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: any) {
        event.stopPropagation();
        event.preventDefault();

        if (this.handle !== undefined && event.target !== this.handle) {
            return;
        }

		this.startX = event.changedTouches[0].clientX;
		this.startY = event.changedTouches[0].clientY;
        this.pickUp();
    }

    @HostListener('document:touchmove', ['$event'])
    onTouchMove(event: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.moving && this.allowDrag) {
            this.moveTo(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        }
    }
}
