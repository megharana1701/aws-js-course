import { computed, inject, Injectable, signal } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../core/api.service';
import { Product } from '../products/product.interface';
import { ProductsService } from '../products/products.service';

type ApiCartItem = {
  id: number;
  product_id: string;
  count: number;
  cart_id: number;
};
@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  /** Key - item id, value - ordered amount */

  constructor() {
    super();
    this.loadCart();
  }

  private readonly productsService = inject(ProductsService);
  #cart = signal<Record<string, number>>({});

  cart = this.#cart.asReadonly();

  totalInCart = computed(() => {
    const values = Object.values(this.cart());

    if (!values.length) {
      return 0;
    }

    return values.reduce((acc, val) => acc + val, 0);
  });

  loadCart(): void {
    const url = this.getUrl('cart', 'api/profile/cart');

    this.http.get<ApiCartItem[]>(url).subscribe({
      next: (items) => {
        const cart = items.reduce<Record<string, number>>((acc, item) => {
          acc[item.product_id] = item.count;
          return acc;
        }, {});

        this.#cart.set(cart);
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
      },
    });
  }

  addItem(id: string): void {
    this.updateCount(id, 1);

    const count = this.cart()[id];

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        console.log(product);
        if (!product) {
          console.error('Product not found');
          return;
        }

        const url = this.getUrl('cart', 'api/profile/cart');

        this.http
          .put(url, {
            product: {
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
            },
            count,
          })
          .subscribe({
            next: (res) => console.log('Cart updated', res),
            error: (err) => console.error(err),
          });
      },
      error: (err) => console.error(err),
    });
  }

  removeItem(id: string): void {
    this.updateCount(id, -1);

    const count = this.cart()[id] ?? 0;

    this.productsService.getProductById(id).subscribe((product) => {
      if (!product) {
        return;
      }

      const url = this.getUrl('cart', 'api/profile/cart');

      this.http
        .put(url, {
          product,
          count,
        })
        .subscribe();
    });
  }

  empty(): void {
    this.#cart.set({});
  }

  private updateCount(id: string, type: 1 | -1): void {
    const val = this.cart();
    const newVal = {
      ...val,
    };

    if (!(id in newVal)) {
      newVal[id] = 0;
    }

    if (type === 1) {
      newVal[id] = ++newVal[id];
      this.#cart.set(newVal);
      return;
    }

    if (newVal[id] === 0) {
      console.warn('No match. Skipping...');
      return;
    }

    newVal[id]--;

    if (!newVal[id]) {
      delete newVal[id];
    }

    this.#cart.set(newVal);
  }

  getCartOrderUrl(): string {
    return this.getUrl('cart', 'api/profile/cart/order');
  }

  placeOrder(url: string, address: unknown): Observable<unknown> {
    return this.http.put(url, { address });
  }
}
