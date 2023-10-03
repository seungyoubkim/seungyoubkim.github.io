---
title: Angular
description: 앵귤러에 대해 알아봅니다.
date: 2021-04-02
---
> ⚠️ 해당 글의 내용과 예시 코드, 이미지는 모두 참고 자료에서 가져 와 정리 한 것입니다.

최근에 모 기업의 면접을 볼 기회를 얻게 되었습니다.

해당 기업은 프론트엔드 메인 기술 스택으로 Typescript + Angular 를 사용하고 있었습니다.

면접 준비를 위해 Anuglar 의 기초적인 내용을 알아보기 위해서 공식 문서의 튜토리얼을 따라가 보면서 알게된 내용들을 정리해 보았습니다.

# 템플릿 문법
---
Angular 의 템플릿에는 HTML 과 Javascript 를 확장한 템플릿 문법을 사용 할 수 있습니다.

기본적으로 *ngFor, *ngIf 등의 구조 디렉티브가 있습니다.

구조 디렉티브는 일반적으로 엘리먼트를 DOM 에 추가하거나 제거하고, 조작하는 방식으로 동작합니다.

구조 디렉티브는 * 문자로 시작합니다.

```html
<div *ngFor="let product of products">
  <h3>
      {{ product.name }}
  </h3>
</div>
```

또한 프로퍼티 바인딩 문법 [ ] 을 사용해 프로퍼티 값을 템플릿 표현식에 사용할 수 있습니다.

```html
<a [title]="product.name + ' details'">
  {{ product.name }}
</a>
```

또 엘리먼트에서 발생하는 이벤트 중 반응하기를 원하는 이벤트 이름 양쪽에 ( ) 을 붙이면 이벤트를 바인딩할 수 있습니다.

```html
<button (click)="share()">
  Share
</button>
```

> 📄 Angular의 템플릿 문법은 정말 다양하게 활용할 수 있습니다. [템플릿 문법](https://angular.kr/guide/architecture-components#template-syntax) 문서를 참고하세요.

# 컴포넌트
---
컴포넌트는 사용자 인터페이스나 UI 를 재사용하기 위해 정의한 단위로 3가지 요소로 구성됩니다.

- 컴포넌트 클래스는 데이터를 처리하며 로직을 담당합니다.
- HTML 템플릿은 UI를 정의합니다.
- 컴포넌트 스타일는 컴포넌트의 모습을 지정합니다.

컴포넌트는 기본적으로 아래와 같은 모습을 지니고 있습니다.

```tsx
// product-alerts.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
```

컴포넌트 클래스에 @Component() 데코레이터가 사용되었습니다. 이 데코레이터가 지정된 클래스는 컴포넌트로 동작합니다. 이 데코레이터에는 컴포넌트가 동작하는데 필요한 셀렉터, 템플릿, 스타일 파일이 메타데이터로 지정됩니다.

> 📄 컴포넌트에 대한 내용과 컴포넌트끼리 템플릿에서 상호작용하는 방법에 대해 더 알아보려면 [컴포넌트 소개](https://angular.kr/guide/architecture-components) 문서를 참고하세요.

# 입력 프로퍼티
---
입력 프로퍼티를 받기 위해서는 @angular/core 패키지에 있는 Input 심볼을 로드합니다.

```tsx
import { Input } from '@angular/core';
```

그리고 부모 컴포넌트에서 전달 받기 원하는 프로퍼티 값에 @Input() 데코레이터를 추가합니다.

```tsx
export class ProductAlertsComponent implements OnInit {
  @Input() product;
  constructor() { }

  ngOnInit() {
  }

}
```

이후 부모 컴포넌트에서 위 자식 컴포넌트를 추가 할 때 프로퍼티 바인딩을 사용해 전달을 원하는 값을 원하는 입력 프로퍼티에 연결을 해줍니다.

```html
<app-product-alerts
  [product]="product">
</app-product-alerts>
```

> 📄 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법, 이 데이터에 따라 다르게 동작하는 방법, 입력 프로퍼티 값이 변경된 것을 감지하고 반응하는 방법에 대해 더 알아보려면 [컴포넌트 상호작용](https://angular.kr/guide/component-interaction) 문서를 참고하세요.

# 출력 프로퍼티
---
출력 프로퍼티를 이용하면 이벤트를 외부로 방출해 외부에서 이 이벤트를 받아 반응 할 수 있습니다.

우선 @angular/core 패키지에 있는 Output 심볼과 EventEmitter 심볼을 로드합니다.

```tsx
import { Output, EventEmitter } from '@angular/core';
```

이후 EventEmitter() 타입으로 프로퍼티를 선언하고 @Output() 데코레이터를 지정하면 해당 프로퍼티를 통해 컴포넌트 외부로 이벤트를 보낼 수 있습니다.

```tsx
export class ProductAlertsComponent {
  @Output() notify = new EventEmitter();
}
```

그리고 템플릿 코드에서 특정 이벤트가 일어났을 때 이벤트를 보낼 수 있도록 notify.emit() 메소드를 다음과 같이 작성합니다.

```html
<button (click)="notify.emit()">Notify Me</button>
```

그리고 부모 컴포넌트에서 방출되는 이벤트를 받아 실행 할 함수를 생성하고 해당 함수를 notify 프로퍼티에 바인딩 해줍니다.

```tsx
export class ProductListComponent {
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
```

```html
<app-product-alerts
  [product]="product" 
  (notify)="onNotify()">
</app-product-alerts>
```

> 📄 자식 컴포넌트에서 발생한 이벤트를 감지하는 방법, 자식 컴포넌트의 프로퍼티를 참조하거나 메소드를 실행하는 방법, 서비스를 사용해서 부모 컴포넌트와 자식 컴포넌트가 양방향으로 연결하는 방법에 대해 더 알아보려면 컴포넌트 [상호작용 문서](https://angular.kr/guide/component-interaction)를 참고하세요.

# 네비게이션
---
Angualr 에는 라우터 기능을 내장하고 있습니다.

라우터에 추가를 원하는 컴포넌트를 생성한 뒤 app.module.ts 파일에서 라우팅 규칙을 아래와 같이 등록 할 수 있습니다.

```tsx
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
    ])
  ],
```

라우팅 규칙으로 등록한 주소로 이동하려면 컴포넌트 템플릿에 해당 기능을 하는 routerLink 디렉티브를 추가하면 됩니다.

```html
<div *ngFor="let product of products; index as productId">
  <h3>
    <a [title]="product.name + ' details'" [routerLink]="['/products', productId]">
      {{ product.name }}
    </a>
  </h3>
</div>
```

RouterLink 디렉티브를 사용하면 앵커 엘리먼트의 동작을 가로채서 라우터가 제어합니다.

다음은 라우팅 규칙에 있는 데이터를 활용하는 방법에 대해 알아보겠습니다.

우선 @angular/router 패키지에서 ActivatedRoute 심볼을 로드합니다.

```tsx
import { ActivatedRoute } from '@angular/router';
```

그리고 생성자에 ActivatedRoute 객체 타입으로 의존성으로 주입합니다.

```tsx
export class ProductDetailsComponent implements OnInit {
  product;

  constructor(
    private route: ActivatedRoute,
  ) { }

}
```

ngOnInit() 메소드에서 라우팅 변수를 구독해서 productId 변수를 가져오고, 이 id에 해당하는 상품 정보를 가져옵니다.

```tsx
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.product = products[params.get('productId')];
  });
}
```

이렇게 가져온 product 를 아래와 같이 템플릿에서 이용 할 수 있습니다.

```html
<h2>Product Details</h2>

<div *ngIf="product">
  <h3>{{ product.name }}</h3>
  <h4>{{ product.price | currency }}</h4>
  <p>{{ product.description }}</p>

</div>
```

>  📄 product.price를 숫자 형태에서 통화 형식으로 변환하기 위해 currency 파이프를 사용했습니다. 파이프는 HTML 템플릿 안에서 데이터가 표시되는 형식을 변환하는 역할을 합니다. 자세한 내용은 [파이프](https://angular.kr/guide/pipes) 문서를 참고하세요.

# 데이터 다루기
---
Angular 에는 애플리케이션의 구성요소를 통합하는 역할의 서비스(Services) 가 존재합니다.

서비스는 클래스 인스턴스이며 Angualr 의 의존성 주입 시스템으로 주입할 수 있기 때문에 애플리케이션의 어느 곳에서도 자유롭게 활용할 수 있습니다.

서비스는 아래와 같은 모습을 하고 있습니다.

```tsx
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

}
```

그리고 아래와 같이 프로퍼티와 메소드를 선언합니다.

```tsx
export class CartService {
  items = [];

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
```

그리고 해당 서비스를 활용할 컴포넌트에서는 서비스 심볼을 로드한 후 생성자에 의존성으로 주입합니다.

```tsx
import { CartService } from '../cart.service';

export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }
}
```

원하는 곳에서 cartService 의 메소드를 이용 할 수 있습니다.

```tsx
export class ProductDetailsComponent implements OnInit {
  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
```

> 📄 서비스에 대해 자세하게 알아보려면 [서비스와 의존성 주입](https://angular.kr/guide/architecture-services) 문서를 참고하세요.

# HTTP 클라이언트
---
앵귤러는 외부 서버에서 제공하는 데이터를 스트림 형태로 가져올 수 있는 HTTP 클라이언트를 자체적으로 제공합니다.

Angular HTTP 클라이언트를 사용하려면 앱에 HttpClientModule을 로드해야 합니다.

HttpClientModule을 로드하면 HttpClient가 자동으로 앱에 등록되기 때문에 앱 전체 범위에서 HttpClient 인스턴스를 자유롭게 사용할 수 있습니다.

앱 전역에 필요한 심볼과 기능이 등록되어 있는 app.module.ts 에 @angular/common/http 패키지에 있는 HttpClientModule을 로드하고 AppModule에 붙은 @NgModule() 데코레이터 imports 배열에 추가합니다.

```tsx
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
    ])
  ],
  // ...
})
export class AppModule { }
```

AppModule에 HttpClientModule을 등록하고 나면 이제 데이터를 가져올 서비스에 HttpClient 서비스를 의존성으로 주입해야 합니다.

우선 원하는 서비스에 @angular/common/http 패키지에 있는 HttpClient 심볼을 로드하고, 생성자에 의존성으로 주입합니다.

```tsx
import { HttpClient } from '@angular/common/http';

export class CartService {
  items = [];

  constructor(
    private http: HttpClient
  ) {}
}
```

그리고 원하는 함수에서 HttpClient get() 메소드를 사용해서 데이터를 가져옵니다.

```tsx
getShippingPrices() {
  return this.http.get('/assets/shipping.json');
}
```

Angular HttpClient에 대해 자세하게 알아보려면 [클라이언트-서버 통신](https://angular.kr/guide/http) 문서를 참고하세요.

이후 원하는 컴포넌트에서 해당 서비스를 주입한 뒤 위에서 만든 get 함수를 사용해 프로퍼티에 할당합니다.

```tsx
export class ShippingComponent implements OnInit {
  shippingCosts;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.shippingCosts = this.cartService.getShippingPrices();
  }

}
```

그리고 컴포넌트 템플릿에서 async 파이프와 함께 사용합니다.

```tsx
<h3>Shipping Prices</h3>

<div class="shipping-item" *ngFor="let shipping of shippingCosts | async">
  <span>{{ shipping.type }}</span>
  <span>{{ shipping.price | currency }}</span>
</div>
```

> 📄 async 파이프는 스트림에서 전달되는 마지막 데이터를 반환하며 이 동작은 컴포넌트가 종료될 때까지 계속 실행됩니다. 그리고 Angular가 컴포넌트를 종료하면 async 파이프도 자동으로 동작을 멈춥니다. async 파이프에 대해 자세하게 알아보려면 [AsyncPipe API](https://angular.kr/api/common/AsyncPipe) 문서를 참고하세요.

# 폼
---
Angular가 제공하는 폼 기능은 표준 HTML 폼을 기반으로 동작하며 폼 유효성 검사를 편하게 실행할 수 있도록 커스텀 폼 컨트롤을 제공합니다.

Angular가 제공하는 반응형 폼은 두 부분으로 구분할 수 있습니다. 하나는 컴포넌트 코드에서 폼을 구성하고 관리하는 코드이며, 다른 하나는 이 폼을 화면에 표시하는 템플릿 부분입니다.

제일 먼저 폼 모델을 구성해 봅시다. 폼 모델은 폼 데이터가 저장되고 폼의 상태를 표현하는 원천 소스이며 컴포넌트 클래스에 정의합니다.

폼 컨트롤을 생성할 때 Angular FormBuilder 서비스를 사용하면 편합니다

@angular/forms 패키지에서 FormBuilder 심볼을 로드하고 의존성으로 주입합니다.

```tsx
import { FormBuilder } from '@angular/forms';

export class CartComponent implements OnInit {
  items;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}
```

그리고 폼 모델을 할당 할 프로퍼티를 선언하고 FormBuilder group() 메소드를 이용하여 폼 모델을 생성합니다.

```tsx
export class CartComponent implements OnInit {
  items;
  checkoutForm;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}
```

폼 제출 시 사용 할 메소드는 아래와 같이 정의합니다. (주문 로직은 없는 임시 메소드입니다.)

```tsx
onSubmit(customerData) {
  // 주문 로직은 여기에 구현합니다.
  this.items = this.cartService.clearCart();
  this.checkoutForm.reset();

  console.warn('Your order has been submitted', customerData);
}
```

그리고 원하는 템플릿에 HTML 폼 엘리먼트를 추가 한 후 formGroup 프로퍼티에 checkoutForm을 바인딩하고 위에서 만든 submit 이벤트도 ngSubmit 이벤트와 바인딩 합니다.

```tsx
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit(checkoutForm.value)">
  <button class="button" type="submit">Purchase</button>
</form>
```

그리고 입력 필드를 추가하고 formControlName 어트리뷰트를 바인딩하면 폼모델에 있는 해당 필드와 연결을 할 수 있습니다.

```tsx
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit(checkoutForm.value)">
  <div>
    <label for="name">
      Name
    </label>
    <input id="name" type="text" formControlName="name">
  </div>
  <div>
    <label for="address">
      Address
    </label>
    <input id="address" type="text" formControlName="address">
  </div>
  <button class="button" type="submit">Purchase</button>
</form>
```

# 느낀점
---
정말 기초적인 내용만 살펴보았지만 주로 리액트를 이용해 개발을 했던 입장에서 많은 차이점이 느껴졌습니다.

가장 크게 느껴진 차이점은 데이터를 다루는 방식과 비동기 데이터를 처리하는 부분인 것 같습니다.

확실히 SPA 애플리케이션에 필요한 모든 기능들을 포함하는 프레임워크인 만큼 알아두고 시작해야하는 부분도 많고 옵저버블, 모듈, 서비스, 의존성등 낯선 개념들이 많이 등장해 다른 라이브러리들 보다는 어렵게 느껴지는건 사실인 것 같습니다.

하지만 그런만큼 SPA에 필요한 대부분의 기능들을 자체 제공하므로써 추가적인 고민없이 주어진 기능을 이용하면 쉽게 서비스를 구축할 수 있고 대형 프로젝트에서도 쉽게 일관성을 유지 할 수 있다는 큰 장점이 있다고 생각됩니다.

## 이후 작성 할 내용
---
1. RxJS
2. Vue

## 참고 자료
---
- [Angular 앱 개발 시작하기](https://angular.kr/start)