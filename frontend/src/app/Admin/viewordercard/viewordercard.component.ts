import { Component, Input } from '@angular/core';
import { combineded } from '../../Modals/order.modal';
import { OrderitemcardsComponent } from '../../Order/orderitemcards/orderitemcards.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewordercard',
  imports: [OrderitemcardsComponent, DatePipe],
  templateUrl: './viewordercard.component.html',
  styleUrl: './viewordercard.component.css'
})
export class ViewordercardComponent {
@Input() viewallorder!: combineded

}
