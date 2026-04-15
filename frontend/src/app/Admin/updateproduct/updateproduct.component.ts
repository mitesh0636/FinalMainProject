import { Component } from '@angular/core';
import { Adminservice } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Productservice } from '../../General/product.service';
import { Subject, takeUntil } from 'rxjs';
import { getproductdetailresponse } from '../../Modals/Product.modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateproduct',
  imports: [FormsModule, CommonModule],
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.css'
})
export class UpdateproductComponent {
updateprod = {
name:'',
description:'',
price:'',
available:0,
subCategoryId:0
};
pid = 0;
productdata!: getproductdetailresponse;
selectedFile: File | null = null;
errormessage="";
destroy$ = new Subject<void>()


constructor(
private route: ActivatedRoute, 
private productservice: Productservice,
private adminservice: Adminservice,
private router: Router
)
{}

getproduct(id:number){
this.productservice.getProductById(id).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.updateprod.name = data.name;
    this.updateprod.description = data.description;
    this.updateprod.price = data.price;
    this.updateprod.available = data.available;
    this.updateprod.subCategoryId = data.SubCategory.id
  },
  error: (err) => {
    this.errormessage = err.error.message || "Unable to fetch";
  }
})
}


onFileChange(event: any){
this.selectedFile = event.target.files[0];
}

updateproduct(id:number){
const fd = new FormData();
fd.append('name', this.updateprod.name)
fd.append('description', this.updateprod.description)
fd.append('price', this.updateprod.price)
fd.append('available', String(this.updateprod.available))
fd.append('subCategoryId', String(this.updateprod.subCategoryId));

if (this.selectedFile){
  fd.append('imagePath', this.selectedFile);
}

this.adminservice.updateProduct(id, fd).pipe(takeUntil(this.destroy$)).subscribe({
next: (data) => {
  console.log("Updated Sucessfully")
  alert("Product updated Sucessfully")
},
error: (err) => {
  this.errormessage = err.error.message;
}
})

}


deleteproduct(id:number){
this.adminservice.deleteProduct(id).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    console.log("Product deleted sucessfully");
    alert("Product deleted sucessfully");
  },
  error: (err) => {
    this.errormessage = err.error.message || "Unable to Delete Product"
  }
})
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
