import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[imgSize]'
})
export class ImgSizeDirective {
  @Input() imgSize: number = 25;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const size = this.imgSize + 'px';
    this.renderer.setStyle(this.el.nativeElement, 'width', size);
    this.renderer.setStyle(this.el.nativeElement, 'height', size);
  }
}
