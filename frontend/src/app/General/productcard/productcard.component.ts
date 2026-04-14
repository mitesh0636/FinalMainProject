import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getProductsResponse, Product } from '../../Modals/Product.modal';
import { Productservice } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productcard',
  imports: [FormsModule, CommonModule],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.css'
})
export class ProductcardComponent {
@Input() product!: Product;

@Output() idsend = new EventEmitter<number>();


constructor(public productService: Productservice) {}

clickandopen(): void {
if (this.product && this.product.id){
  this.idsend.emit(this.product.id);
}
}
}
