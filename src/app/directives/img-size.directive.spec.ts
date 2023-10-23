import { ElementRef, Renderer2 } from '@angular/core';
import { ImgSizeDirective } from './img-size.directive';

describe('ImgSizeDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(null);
    const renderer: Partial<Renderer2> = {};
    const directive = new ImgSizeDirective(el, renderer as Renderer2);
    expect(directive).toBeTruthy();
  });
});
