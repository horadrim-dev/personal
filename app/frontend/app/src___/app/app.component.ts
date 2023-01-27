import { Component } from '@angular/core';
export interface Card{
  title: string
  text: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  toggle = true
  cards: Card[] = [
    {title: 'Card 1', text: 'This is card 1'},
    {title: 'Card 2', text: 'This is card 2'},
    {title: 'Card 3', text: 'This is card 3'},
    {title: 'Card 3', text: 'This is card 3'},
    {title: 'Card 3', text: 'This is card 3'}
  ]
  toggleCards(){
    this.toggle = !this.toggle
  }
}
