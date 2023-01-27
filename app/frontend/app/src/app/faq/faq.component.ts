import { Component } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  constructor(private api: ApiService){
  }

}
