import {Component, Input, OnInit} from '@angular/core';
import { Card } from '../app.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    // interpolation: ['[[', ']]']
})
export class CardComponent implements OnInit{

    @Input('card') 
    card!: Card;
    @Input('index')
    index!:number;
    title = 'hz'
    text = 'text'
    number = 42
    array = [1,2,3,4,5.5]
    obj ={
        name: 'HzName',
        info: {age: 25, job: 'forntend'}
    }
    textColor = 'blue'
    cardDate: Date = new Date();
    ngOnInit(): void {
        setTimeout( () => {
            this.card.text = 'dynamically changed text'
        }, 3000 )
    }
    getInfo(): string {
        return 'This returned by method getInfo()'
    }
    inputHandler(event: any) {
        this.card.title = event.target.value
    }
}