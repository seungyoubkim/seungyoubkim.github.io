---
title: 자바스크립트 Iterator
description: 자바스크립트의 이터레이터에 대해 알아봅니다.
date: 2021-01-24
---
> ⚠️ 해당 글의 내용과 예시 코드, 이미지는 모두 참고 자료에서 가져 와 정리 한 것입니다.

오늘은 ES6 의 새로운 반복 방식인 Iterator 에 대해 간단하게 알아보도록 하겠습니다.

# ES5 까지의 루프(Loop)
---
- ES5 까지의 자바스크립트는 아래와 같은 방식으로 배열의 객체에 접근했습니다.

```jsx
var colors = ['red', 'green', 'blue']

for(var i = 0; i < colors.length; i++) {
	console.log(colors[i])
}
```

- 위와 같은 방식은 매우 간단하지만 루프가 중첩되며 여러 변수를 추적해야 할때 문제가 발생합니다.

# Iterator
---
- Iterator 는 반복을 위해 설계 된 특정 인터페이스가 있는 객체입니다.
- Iterator 는 next() 라는 메서드를 가지고 있는 객체이며 next() 메서드는 반환 할 값인 value 와 더 이상 반환 할 값이 없는지 나타내는 값인 done 을 반환해야합니다.
    - 요약하자면 Iterator는 { value, done } 객체를 리턴하는 next() 를 가진 값입니다.
- 위와 같은 Iterator 는 아래와 같은 함수로 만들 수 있습니다.

```jsx
function createIterator(items) { //iterator 객체를 생성하여 반환하는 함수
  let i = 0;
  return {
    next() {
      const done = i >= items.length
      const value = !done ? items[i++] : undefined
      return { done, value }
    }
  }
}

const iterator = createIterator([1,2,3])

console.log(iterator.next()) // {done: false, value: 1}
console.log(iterator.next()) // {done: false, value: 2}
console.log(iterator.next()) // {done: false, value: 3}
console.log(iterator.next()) // {done: true, value: undefined}
console.log(iterator.next()) // {done: true, value: undefined}
```

# Symbol
---
- 이어서 Iterable 에 대해 알아보기 이전에 ES6 에서 추가 된 심볼(Symbol) 에 대해 먼저 알아보겠습니다.
- 심볼은 ES6 에서 새롭게 추가 된 7번째 타입으로 변경 불가능한 원시 타입의 값입니다.
    - 자바스크립트는 ES5 까지 아래의 6개의 타입만이 존재했습니다.
        - 원시 타입 (primitive data type)
            - Boolean
            - null
            - undefined
            - Number
            - String
        - 객체 타입 (Object type)
            - Object
- 심볼은 Symbol() 함수로 생성하며 함수가 호출 될 때마다 변경 불가능한 원시 타입의 값인 Symbol 값을 생성합니다.
    - Symbol() 함수의 인자로 문자열을 전달 가능한데 이 문자열은 심볼 생성에 어떠한 영향도 주지 않으며 오직 생성된 심볼에 대한 설명으로 디버깅 용도로만 사용됩니다.
- 심볼 값은 유일한 값이기 때문에 심볼은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용합니다.

```jsx
const obj = {};

const mySymbol = Symbol('mySymbol');
obj[mySymbol] = 123; // 다른 어떠한 프로퍼티와도 충돌하지 않는다.

console.log(obj); // { [Symbol(mySymbol)]: 123 }
console.log(obj[mySymbol]); // 123
```

# Iterable
---
- Iterable 은 위에서 이야기 한 Iterator 객체를 반환하는 Symbol.iterator 를 가지고 있는 값을 이야기 합니다.

```jsx
function createIterator(items) { //iterator 객체를 생성하여 반환하는 함수
  let i = 0;
  return {
    next() {
      const done = i >= items.length
      const value = !done ? items[i++] : undefined
      return { done, value }
    }
  }
}

const iterable = {
	[Symbol.iterator]() {
		return createIterator([1,2,3])
	}
}

const iterator = iterable[Symbol.iterator]()

console.log(iterator.next()) // {done: false, value: 1}
console.log(iterator.next()) // {done: false, value: 2}
console.log(iterator.next()) // {done: false, value: 3}
console.log(iterator.next()) // {done: true, value: undefined}
console.log(iterator.next()) // {done: true, value: undefined}
```

- ES6 의 Array, Map, Set 등은 기본적으로 Iterator 객체를 반환하는 Symbol.iterator 함수를 가지고 있기 때문에 Iterable 하다고 이야기 합니다.

# well-formed iterable
---
- 위와같은 iterable 에서 Symbol.iterator 함수가 반환한 iterator 객체에 자기 자신을 반환하는 Symbol.iterator 메서드를 포함하는 iterable 을 well-formed iterable(잘 정의 된 이터레이블) 이라고 합니다.

```jsx
function createWellFormedIterator(items) {
  let i = 0;
  return {
    next() {
      const done = i >= items.length
      const value = !done ? items[i++] : undefined
      return { done, value }
    },
    [Symbol.iterator]() {
		  return this
	  }
  }
}

const wellFormedIterable = {
    [Symbol.iterator]() {
		  return createWellFormedIterator([1,2,3])
	  }
  }

const iterator = iterable[Symbol.iterator]()
console.log(iterator[Symbol.iterator]() === iterator) // true
```

- Array, String 등은 모두 well-formed iterable 입니다.

```jsx
const iterator = [1,2,3][Symbol.iterator]();
iterator[Symbol.iterator]() === iterator; // true
```

# Iteration Protocols
---
- 위와 같은 조건을 만족하는 Iterable 값들을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약을 [Iteration protocols](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols) 라고 합니다.
    
- 이러한 프로토콜은 ES6 내장 값들만 사용 가능한게 아니기 때문에 이미 다양한 자바스크립트 오픈소스등의 순회가 가능한 값들을 가진 값은 이 프로토콜을 따르고 있습니다.
    
    - 예를 들어 브라우저에서 제공하는 Web API 의 DOM 과 관련된 값들도 이러한 프로토콜을 따라 반복이 가능하도록 되어있어 아래와 같이 사용이 가능합니다.
    
    ```jsx
    const all = document.querySelectorAll('*');
    for(const node of all) console.log(node);
    ```
    
- Iteration Protocols 를 만족하는 Iterable 값들은 아래와 같은 방법으로 순회하여 사용이 가능합니다.
    

```jsx
// 제너레이터에 대해서는 아래에서 설명
function *odds(l) {
  for(let i=1; i<l; i++) {
    if(i%2) yield i
  }
}

// for...of
for(let odd of odds) {
	console.log(odd)
}

// 전개 연산자
console.log(...odds(10)) // 1 3 5 7 9
console.log([...odds(10), ...odds(20)]) // [1, 3, 5, 7, 9, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

// 구조 분해, 나머지 연산자
const [a, b, ...rest] = odds(10)
console.log(a) // 1
console.log(b) // 3
console.log(rest) // [5, 7, 9]
```

# Generator
---
- 제너레이터(Generator)는 이터레이블이자 이터레이터를 반환하는 함수입니다.
- Generator 함수는 function 키워드 앞에 `*` 이 추가되고 함수 내부에서 yield 라는 키워드를 사용 할 수 있습니다.
- 또한 Generator 함수에서 return 키워드를 사용하면 done 이 처음으로 true 일 때의 value 값을 지정 할 수도 있습니다. (done 이 true 일 때의 값이기에 순회에서는 사용되지 못합니다.)

```jsx
function *createIter() {
	yield 1;
	yield 2;
	yield 3;
	return 100; // done 이 처음으로 true 일 때의 value 를 return 값으로 지정 할 수 있음
}

let iter = createIter() // 이터레이블이자 이터레이터
console.log(iter[Symbol.iterator]() === iter) //true (well-formed iterable)

iter.next() // { value: 1, done: false }
iter.next() // { value: 2, done: false }
iter.next() // { value: 3, done: false }
iter.next() // { value: 100, done: true }
iter.next() // { value: undefined, done: true }
```

- 제너레이터 함수는 yield 를 만나면 함수가 잠시 suspend(정지) 되는 동시에 함수 컨텍스트를 복사하고 콜스택을 벗어납니다.
- 그러다 caller 가 next() 메서드를 call 하면 저장해 둔 스택 프레임들이 복원되어 복원 된 컨텍스트에서 중단 된 지점부터 resume(재개)되어 실행됩니다.
- 위 같은 특성을 코루틴(coroutine) 이라고 합니다.
    - 코루틴과 반대 개념으로 서브루틴(subroutine) 이 있는데 서브루틴은 루틴이 불가 한 자바스크립트의 일반 함수를 생각하시면 됩니다.
        - 일반함수(서브루틴)은 caller 가 함수를 call 하면 callee 함수는 콜스택에 들어와 작동합니다.
        - 함수가 종료되면 일반함수는 콜스택에서 사라져 다시 실행 할 수 없습니다. (다시 실행 할 경우 처음부터 시작됩니다.)
- 위처럼 자바스크립트는 어떠한 객체든 이터러블이라면 순회가 가능하고 제너레이터는 어떠한 값이든 이터러블로 만들 수 있기에 자바스크립트는 어떠한 값이든 순회가 가능한 코드로 만들 수 있음을 의미합니다.

# Iterable Protocol 사용 예시
---
- 아래는 객체 배열에서 원하는 key 의 값들만 가지는 객체를 생성하는 예시 코드입니다.

```jsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]

const names = []
for(let product of products) {
  names.push(product.name)
}
console.log(names)

const prices = []
for(let product of products) {
  prices.push(product.price)
}
console.log(prices)
```

- 위 코드를 아래와 같이 map 함수로 만들어 중복을 제거 할 수 있습니다.

```jsx

function map(f, iter) {
  const res = []
  for(let a of iter) {
    res.push(f(a))
  }
  return res
}

console.log(map(p => p.name, products))
console.log(map(p => p.price, products))
```

- 위 처럼 함수를 순수함수로 만들어 기존 값을 수정하는게 아니라 복사하여 새로운 값을 만들어내도록 하여 평가시점에 상관없이 안전한 함수로 만들고 고차 함수로 작성해 다형성을 높히는 프로그래밍 방식을 함수형 프로그래밍이라고 합니다.
- 위 map 함수는 iter 객체라면 무엇이든지 순회할 수 있고 인자로 함수를 받아 어떠한 값이든 추출이 가능하기에 다형성이 높은 함수라고 할 수 있습니다.

```jsx
document.querySelectorAll('*').map // NodeList 는 Array 를 상속받지 않기 떄문에 프로토타입에 map 함수가 없어 사용이 불가능하다
console.log(map(n => n.nodeName, document.querySelectorAll('*'))) // 하지만 이터러블 프로토콜을 따르고 있기 때문에 위에서 구현 한 map 함수는 사용이 가능하다. (이터러블 프로토콜의 다형성)
```

- 아래는 javascript 의 filter 와 reduce 를 구현해본 예시 코드입니다.

```jsx
function filter(f, iter) {
  const res = []
  for(let a of iter) {
    if(f(a)) res.push(a)
  }
  return res
}
```

```jsx
function reduce(f, acc, iter) {
  if(!iter) { // 초기값이 없을 경우 iter 의 첫번째 값을 초기 값으로 사용하기 위함
    iter = acc[Symbol.iterator]()
    acc = iter.next().value()
  }
  for(const cur of iter) {
    acc = f(acc, cur)
  }
  return acc
}
```

```jsx
// 위 iterable 들을 이용하여 만든 함수를 중첩해서 사용하는 예시
// 함수형으로 사고를 하고 코딩을 할 수 있도록 해준다.
console.log(
	reduce(
		add,
		map(p => p.price, filter(p => p.price < 20000))
	)
)
```

# Generator 를 이용한 비동기 처리
---
- generator 를 이용하여 비동기 코드를 동기적 코드 방식으로 작성 할 수 있습니다.
- 우선 아래와 같이 가짜 API 함수를 만들어 보겠습니다.

```jsx
const users = [
	{ id: 0, name: 'seungyoub' },
	{ id: 1, name: 'boyun' },
	{ id: 2, name: 'sam' },
]

const getUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(users)
    }, 500)
  })
}
```

- getUsers 함수가 비동기적으로 데이터를 불러오기 때문에 사용을 위해선 아래와 같이 then 을 사용 할 수 있습니다.

```jsx
getUsers().then(response => {
  console.log(response)
})
```

- 위 코드를 generator 를 활용하면 아래와 같이 변경 할 수 있습니다.

```jsx
function *gen() {
  const response = yield getUsers()
  console.log(response)
}

const iterator = gen()
const request = iterator.next().value
request.then(response => {
  iterator.next(response)
})
```

- 위 방식의 작동 원리는 아래와 같습니다.
    1. generator 함수를 실행해 iterator 를 받아와 iterator.next() 를 실행해 yield 뒤의 getUsers() 함수까지 실행이 되면서 getUsers() 함수를 value 를 통해 외부로 가져오게 됩니다.
    2. value 로 가져온 getUsers() 의 반환값이 requeset 에 할당됩니다.
    3. getUsers 의 Promise 가 resolve 되면 request.then 이 실행되게 됩니다.
    4. request.then 내부의 iterator.next(response) 를 통해 getUsers 에서 받아온 response 를 iterator 의 response 로 할당시키면서 suspense 되었던 iterable 을 resume 합니다.
- 위 코드가 더 복잡해졌다고 생각하실 수도 있지만 유심히 봐야 할 부분은 gen 함수입니다.

```jsx
 function *gen() {
  const response = yield getUsers()
  console.log(response)
}
```

- Promise 를 이용했을때처럼 콜백함수처럼 코드를 작성한것이 아니라 동기적으로 작성한 순서 그대로 코드가 실행되는 것을 알 수 있습니다.
- 그리고 위 코드는 아래와 같이 Async/await 를 이용해서 리팩토링이 가능합니다.

```jsx
async function gen() {
  const res = await getUsers()
  console.log(res)
}
```

- 그렇습니다. 위 두 코드는 매우 유사합니다.
- ES7 에 추가 된 Async/await 는 ES6 에 추가 된 Generator 에 기반하여 만들어졌습니다.
- 아래는 Async/await 를 Babel 을 통해 컴파일 한 코드입니다.

```jsx
// ES7
async function foo() {
  await bar();
}

// ES5 complied
let foo = (() => {
  var _ref = _asyncToGenerator(function*() {
    yield bar();
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}
```

## 이후 작성 할 내용
---
1. [redux-saga](/redux-saga)
2. 함수형 프로그래밍

## 참고 자료
---
- [함수형 프로그래밍과 JavaScript ES6+](https://www.inflearn.com/course/functional-es6/dashboard)
- [ECMAScript 6 Iterator와 Generator](https://infoscis.github.io/2018/01/31/ecmascript-6-iterators-and-generators/)
- [[Generator 함수를 이해해보자 (이론편)] 1. "Why” 제네레이터 함수를 써야 하는가?](https://velog.io/@rohkorea86/Generator-%ED%95%A8%EC%88%98%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%B4%EB%B3%B4%EC%9E%90-%EC%9D%B4%EB%A1%A0%ED%8E%B8-%EC%99%9C-%EC%A0%9C%EB%84%A4%EB%A0%88%EC%9D%B4%ED%84%B0-%ED%95%A8%EC%88%98%EB%A5%BC-%EC%8D%A8%EC%95%BC-%ED%95%98%EB%8A%94%EA%B0%80)
- [7번째 타입 심볼(Symbol)](https://poiemaweb.com/es6-symbol)
- [JS - Promise와 Generator을 활용한 async programming](https://suhwan.dev/2018/04/18/JS-async-programming-with-promise-and-generator/)
- [Async-await는 어떻게 구현하는가](https://medium.com/@la.place/async-await%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94%EA%B0%80-fa08a3157647)