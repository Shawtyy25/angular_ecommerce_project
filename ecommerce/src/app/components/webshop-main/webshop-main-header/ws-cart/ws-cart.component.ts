import { Component } from '@angular/core';

@Component({
  selector: 'app-ws-cart',
  imports: [],
  standalone: true,
  templateUrl: './ws-cart.component.html',
  styleUrl: './ws-cart.component.scss'
})
export class WsCartComponent {
  itemCounter: number = 0;
}
