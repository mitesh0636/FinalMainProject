import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // Add ReactiveFormsModule
import { ProductcardComponent } from '../productcard/productcard.component';
import { Productservice } from '../product.service';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap, of, combineLatest, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../Modals/Product.modal';

@Component({
  selector: 'app-productmain',
  standalone: true,
  imports: [ProductcardComponent, ReactiveFormsModule],
  templateUrl: './productmain.component.html',
  styleUrl: './productmain.component.css'
})
export class ProductmainComponent implements OnInit, OnDestroy {
  Products: Product[] = [];
  errormessage = "";

  private destroy$ = new Subject<void>();

  constructor(private productservice: Productservice, private router: Router) {}

  ngOnInit() {
    this.setupSearch();
  }

searchControl = new FormControl('');
minPriceControl = new FormControl(0);
maxPriceControl = new FormControl(1000000);

setupSearch() {
  combineLatest([
    this.searchControl.valueChanges.pipe(startWith(''), debounceTime(400)),
    this.minPriceControl.valueChanges.pipe(startWith(0), debounceTime(400)),
    this.maxPriceControl.valueChanges.pipe(startWith(1000000), debounceTime(400))
  ]).pipe(
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    takeUntil(this.destroy$),
    switchMap(([keyword, min, max]) => {
      const searchTerm = keyword ? keyword.trim() : '';
      if (!searchTerm && min === 0 && max === 1000000) {
        return this.productservice.getproducts();
      }

      return this.productservice.searchProducts(searchTerm, min ?? 0, max ?? 1000000);
    })
  ).subscribe({
    next: (res) => {
      this.Products = res.data;
    },
    error: (err) => this.errormessage = "Filtering failed"
  });
}

  getproducts() {
    this.productservice.getproducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.Products = response.data;
      },
      error: (err) => {
        this.errormessage = err.error?.message || "Unable to fetch products";
      }
    });
  }

  handleopenproductdetails(productId: number) {
    this.router.navigate(['general/productdetails', productId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}