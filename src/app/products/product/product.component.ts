import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private producstService: ProductsService = inject(ProductsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public product!: Product;

  ngOnInit(): void {
    //this.getIdParamAndGetProduct();
  }

  getIdParamAndGetProduct(): void {
    this.route.params.subscribe( ({id}) => this.getProductById(id) )
  }

  getProductById(id: string): void {
    this.producstService.getProductById(id)
    .subscribe({
      next: (product) => this.product = product,
      error: (error) => console.log(error)
    })
  }
}
