import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef) {}

    //if you don't want it to have the feature of clicking OUTSIDE and not showing the dropdown do below:
    //this method below lets you click on the dropdown menu button to display/undisplay the options
    // @HostBinding('class.open') isOpen = false;
    //@HostListener('click') toggleOpen {
    // this.isOpen = !this.isOpen;
    }
