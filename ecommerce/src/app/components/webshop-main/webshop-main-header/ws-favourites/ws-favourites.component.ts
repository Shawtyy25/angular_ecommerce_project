import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ws-favourites',
  imports: [],
  templateUrl: './ws-favourites.component.html',
  styleUrl: './ws-favourites.component.scss',
  standalone: true,
})
export class WsFavouritesComponent {
  favCounter: number = 0;
  @Input() user_state: boolean = false;


}
