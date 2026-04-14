import { Component } from '@angular/core';
import { Productservice } from '../../General/product.service';
import { Adminservice } from '../admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createproduct',
  imports: [FormsModule, CommonModule],
  templateUrl: './createproduct.component.html',
  styleUrl: './createproduct.component.css'
})
export class CreateproductComponent {
product = {
  name:'',
  description:'',
  price: 0,
  available: 0,
  subCategoryId: 0,
};

selectedFile: File | null = null;
errorMessage = "";


constructor(private adminservice: Adminservice) {}

onFileChange(event: any){
  this.selectedFile = event.target.files[0];
}

submitProduct(){
  const fd = new FormData();
  
  fd.append('name', this.product.name);
  fd.append('description', this.product.description);
  fd.append('price', this.product.price.toString());
  fd.append('available', this.product.available.toString());
  fd.append('subCategoryId', String(this.product.subCategoryId));
  
  if (this.selectedFile){
    fd.append('imagePath', this.selectedFile);
  }

  this.adminservice.createProduct(fd).subscribe({
    next: (res) => alert('Product Created'),
    error: (err) => this.errorMessage = "Failed to create product"
  });
}
}
