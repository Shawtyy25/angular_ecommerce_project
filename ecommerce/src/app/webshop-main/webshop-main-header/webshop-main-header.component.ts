import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-webshop-main-header',
  templateUrl: './webshop-main-header.component.html',
  styleUrl: './webshop-main-header.component.scss'
})
export class WebshopMainHeaderComponent {
  @Input() profile: string | null = null;
}
