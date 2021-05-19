import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2, Input } from "@angular/core";

@Directive({
    selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
    //make the color option dynamic by binding to directive properties
    @Input() defaultColor: string = 'lightblue';
    @Input() highlightColor: string = 'lightgreen';

    // @HostBinding('style.backgroundColor') backgroundColor: string = 'lightorange';
    @HostBinding('style.backgroundColor') backgroundColor: string;


    constructor(private elRef: ElementRef, private renderer: Renderer2){}

    ngOnInit() {
    this.backgroundColor = this.defaultColor;

    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'lightblue');
    }

    @HostListener('mouseover') mouseover(eventData: Event){
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'green');
        // this.backgroundColor = 'yellow';
        this.backgroundColor = this.highlightColor;

        }

    @HostListener('mouseleave') mouseleave(eventData: Event){
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'lightblue');
        // this.backgroundColor = 'red';
        this.backgroundColor = this.defaultColor;
        }
}