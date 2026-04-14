import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Adminservice } from '../admin.service';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-createtype',
  imports: [FormsModule, CommonModule],
  templateUrl: './createtype.component.html',
  styleUrl: './createtype.component.css'
})
export class CreatetypeComponent {
typecount = 0;
typename = "";
categoryname = "";
subcategoryname = "";
typeid = 0;
categoryid = 0;
destroy$ = new Subject<void>()
errormessage = "";
producttype!:boolean;
categorytype!: boolean;

constructor(private adminservice: Adminservice) {}

createproducttype(){
this.typecount = 1;
}

createcategory(){
this.typecount = 2;
}

createsubcategory(){
this.typecount = 3;
}


createprotype(){
this.adminservice.createproducttype(this.typename).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    alert("Product type created sucessfully")
  },
  error: (err) => {
   this.errormessage = err.error.message || "Unable to Create"
  }
})
}


createcaet(){
this.adminservice.checkprodid(this.typeid).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
   if (data) {
this.adminservice.createcategory(this.typeid, this.categoryname).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    alert("Category created Sucessfully");
  },
  error: (err) => {
    this.errormessage = err.error.message || 'Unable to create'
  }
})
   }
   else{
    alert("product not found");
   }
  },
  error: (err) => {
    this.errormessage = err.error.message || 'Failure'
  }
})

}


createsub(){
this.adminservice.checkcatid(this.categoryid).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
   if(data) 
   {
    this.adminservice.createsubcategory(this.categoryid, this.subcategoryname).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    alert("SubCategory created Successfully");
  },
  error: (err) => {
    this.errormessage = err.error.message || 'Unable to create'
  }
})
   }
   else{
    alert("Category not found");
   }
  },
  error: (err) => {
    this.errormessage = err.error.message || 'Failure'
  }
})
}
}