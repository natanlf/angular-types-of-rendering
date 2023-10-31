import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private producstService: ProductsService = inject(ProductsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public products!: Array<Product>;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.producstService.getProducts()
    .subscribe({
      next: (products) => this.products = products,
      error: (error) => console.log(error)
    })
  }
}
