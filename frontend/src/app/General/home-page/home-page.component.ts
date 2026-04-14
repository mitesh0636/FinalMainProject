import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductmainComponent } from '../productmain/productmain.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductmainComponent, CommonModule], 
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoPlayInterval: any;

  slides = [
    { title: "Welcome to पॉवरहाऊस Ecom", img:"assets/img0.jpg"},
    { title: "Women's Fashion", price: "999", img: "assets/img1.jpg" },
    { title: "Men's Collection", price: "799", img: "assets/img4.jpg" },
    { title: "Accessories", price: "1999", img: "assets/img2.jpg" },
    {title: "Kitchen Essentials", price: "899", img:"assets/img3.jpg"},
    {title: "Books for a smart Nerd", price: "299", img:"assets/img5.jpg"}
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetTimer(); 
  }

  resetTimer() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval); 
    }
  }
}