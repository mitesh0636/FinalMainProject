import { Component, Input } from '@angular/core';
import { getorderitemdetails } from '../../Modals/order.modal';
import { Productservice } from '../../General/product.service';

@Component({
  selector: 'app-orderitemcards',
  imports: [],
  templateUrl: './orderitemcards.component.html',
  styleUrl: './orderitemcards.component.css'
})
export class OrderitemcardsComponent {
@Input() orderitem!:getorderitemdetails

constructor(public productservice: Productservice) {}

}
