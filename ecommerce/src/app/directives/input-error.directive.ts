import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appInputError]'
})
export class InputErrorDirective implements OnChanges {
  @Input() isValid: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateStyle();
  }

  private updateStyle(): void {
    if (!this.isValid) {
      this.renderer.setStyle(this.el.nativeElement, 'outline', '2px solid red');

    } else {
      this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    }
  }


}
