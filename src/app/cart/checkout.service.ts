import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';
import { ProductCheckout } from '../products/product.interface';

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  address: string;
  comment: string;
};

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly cartService = inject(CartService);
  private readonly productsService = inject(ProductsService);

  getProductsForCheckout(): Observable<ProductCheckout[]> {
    const cart = this.cartService.cart();

    return this.productsService.getProductsForCheckout(Object.keys(cart)).pipe(
      map((products) =>
        products.map((product) => ({
          ...product,
          orderedCount: cart[product.id],
          totalPrice: +(cart[product.id] * product.price).toFixed(2),
        })),
      ),
    );
  }

  placeOrder(address: ShippingAddress): Observable<unknown> {
    const url = this.cartService.getCartOrderUrl();

    return this.cartService.placeOrder(url, address);
  }
}
