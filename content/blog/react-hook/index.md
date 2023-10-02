---
title: React Hook
description: React Hook 에 대해 알아봅니다.
date:
---
> ⚠️ 해당 글의 내용과 예시 코드, 이미지는 모두 참고 자료에서 가져 와 정리 한 것입니다.

이번에는 React 16.8 버전부터 도입 된 Hook 에 관해서 이야기 해보도록 하겠습니다.

우선 React 에서 Component 를 구현하는 방법에 대해서 알아봅시다.

# Components and Props
---
- 개념적으로 컴포넌트는 Javascript 함수와 유사합니다.
- 컴포넌트는 "props" 라는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React Element 를 반환합니다.
- props 란 속성을 나타내는 데이터입니다.

# 함수형 컴포넌트
---
- 리액트 컴포넌트를 정의하는 가장 간단한 방법은 아래와 같이 Javascript 함수를 작성하는 것입니다.

```jsx
import React from 'react'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- 위 같은 방법으로 정의한 컴포넌트를 함수형 컴포넌트라고 합니다.
- 이는 데이터를 가진 하나의 props 객체 인자를 전달 받아 React Element 를 반환하는 함수입니다.
- (React 는 JSX를 사용하기 때문에 위처럼 HTML 태그와 유사하게 코드를 사용 할 시 Babel 은 React.createElement 함수 호출로 컴파일하여 React Element 로 변환합니다.)
    - 위 방식은 React 17 에서 변경되었습니다.
- (또한 React.createElements 함수를 호출하는 코드로 컴파일 되기 때문에 JSX 코드와 같은 스코프 내에 React 라이브러리가 코드에 직접적으로 사용되지 않더라도 임포트 되어 있어야 합니다.)
    - 위 문제는 React 17 에서 해결되었습니다.
- (JSX 에 대한 자세한 내용은 아래 링크를 참고해주세요.)
    - [https://ko.reactjs.org/docs/jsx-in-depth.html](https://ko.reactjs.org/docs/jsx-in-depth.html)

# 클래스형 컴포넌트
---
- 위와 다르게 ES6 class 문법을 이용해 컴포넌트를 정의 할 수도 있습니다.

```jsx
import React from 'react'

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

- 위 같은 방법으로 정의한 컴포넌트는 클래스형 컴포넌트 라고 합니다.
- React 관점에서 볼 때 위 두가지 컴포넌트는 동일하지만 클래스형 컴포넌트에는 몇가지 추가 기능이 있습니다.
- 바로 State 와 Lifecycle 입니다.

# State and Lifecycle
---
- State 는 리액트에서 데이터를 다루는 기본적인 개념입니다.
- 리액트는 DOM 업데이트를 최소화 하기 위해 state 가 변경 될 시 해당 state 가 영향을 주는 DOM 을 체크해 변경이 필요하다고 판단되는 DOM만 업데이트를 진행합니다.
- 해당 State 값을 Props 를 이용해 하위 컴포넌트들에게 전달하여 사용하는 top-down 방식이 리액트에서 데이터를 다루는 기본적인 방법이라고 할 수 있습니다.
- 또한 Lifecycle(생명 주기) 함수를 이용해 컴포넌트가 처음 렌더링 되거나 업데이트 되거나 DOM 에서 제거 될 때마다 컴포넌트 업데이트에 필요한 코드를 실행 시킬 수도 있습니다.
- 하지만 이런 State 와 Lifecycle 기술은 클래스 컴포넌트에만 가능했고 함수 컴포넌트에서는 사용이 불가했습니다.
- 이러한 이유로 과거에는 데이터를 다루는 컨테이너(Container) 컴포넌트는 클래스형 컴포넌트로 보여지는 부분을 담당하는프레젠테이셔널(Presentational) 컴포넌트는 함수형 컴포넌트로 작성하는 방법이 일반적이었습니다.

# Hook
---
- 위 같은 이유로 리액트에서 대부분의 주요 컴포넌트들은 클래스형 컴포넌트로 작성이 되었지만 클래스형 컴포넌트에는 아래와 같은 다양한 문제점들이 있었습니다.
    1. 컴포넌트 사이에서 상태와 관련된 로직을 재사용 하기가 어렵습니다.
    2. 생명 주기 함수나 상태 관련 로직이 모든 공간에서 복잡하게 얽혀 컴포넌트를 복잡하게 만듭니다.
        - 이는 많은 사람들이 React 를 별도 상태 관리 라이브러리와 함께 사용하도록 하는 이유 중 하나가 됩니다.
    3. Class 자체가 코드의 재사용성과 코드 구성을 어렵게 만들 뿐만 아니라, React 를 배우는데 큰 진입장벽이 됩니다.
        - Javascript 에서 this 가 동작하는 방식에 대한 이해가 필요합니다.
        - 이벤트 핸들러가 등록되는 방법에 대한 이해가 필요합니다.
        - Class 가 최근 사용되는 도구들에서 많은 문제를 일으킵니다.
- 리액트에서는 위 같은 문제들을 해결하기 위해 Class 없이 React 기능을 사용 할 수 있도록 하는 Hook 이라는 기능을 추가하였습니다.
- Hook 은 함수 컴포넌트에서 React state와 생명주기 기능을 "연동(hook into)" 할 수 있게 해주는 함수입니다.
- Hook 은 class 에서는 동작하지 않습니다.
- React 는 기본적으로 useState, useEffect 등 몇가지 내장 Hook 을 지원하며 직접 Hook 을 만드는 것도 가능합니다.
- Hook 은 그냥 자바스크립트 함수이지만 아래 두가지 규칙을 준수해야합니다.
    1. 최상위(at the top level)에서만 Hook 을 호출해야 합니다.
    2. React 함수 컴포넌트와 직접 작성 한 custom Hook 내에서만 Hook을 호출해야 합니다. (일반 자바스크립트 함수에서 Hook을 호출해서는 안됩니다.)

# useState
---
- useState 는 state를 함수 컴포넌트 안에서 사용 할 수 있도록 해주는 내장 Hook 함수입니다.
- 아래는 useState 함수를 사용하여 state 를 이용하는 예시 코드입니다.

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- useState 함수 사용법에 대한 설명은 아래와 같습니다.
    1. 우선 react 모듈의 useState 함수를 임포트합니다.
    2. useState 함수는 인자로 하나의 값을 받고 해당 값을 기본값으로 하는 state 변수와 해당 state 값을 갱신하는 함수 두가지 값을 반환합니다.
        - state 변수와 갱신하는 함수 두쌍을 배열로 반환하기 때문에 [구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)을 이용해 변수에 저장하는 것이 일반적입니다.
        - [count, setCount] 로 선언한 변수의 이름은 [foo, setFoo] 처럼 원하는 이름으로 선언할 수 있습니다.
        - state 값을 갱신하는 함수는 this.setState 와는 다르게 state 값을 병합하는게 아닌 대체합니다.
    3. 위 코드에서 state 값을 사용할때는 count 변수를 state 값을 갱신할때는 setCount 함수를 사용하면 됩니다.

# useEffect
---
- useEffect 는 데이터를 가져오거나 DOM을 조작하는등의 side effects 를 함수 컴포넌트 안에서 사용 할 수 있도록 해주는 내장 Hook 함수입니다.
- class 컴포넌트의 Lifecycle 함수(componentDidMount, componentDidUpdate, componentWillUnmount)들과 같은 목적으로 제공되지만, 하나의 API로 통합하였습니다.
- 아래는 useEffect 함수를 이용하는 예시 코드입니다.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- useEffect Hook을 이용하여 우리는 리액트에게 해당 함수형 컴포넌트가 랜더링 된 이후에 어떤 일을 수행해야 하는지를 알려줍니다.
- 리액트는 우리가 넘긴 함수를 기억했다가(이 함수를 'effect' 라고 부릅니다) DOM 업데이트를 수행 한 이후에 불러냅니다.
- 위같이 컴포넌트 내부에서 함수를 불러내기 때문에 effect 에서 state 변수나 prop 변수에 바로 접근이 가능합니다.
- 기본적으로 useEffect 에 인자로 넘긴 effect 함수는 첫번째 렌더링과 이후의 모든 업데이트마다 수행됩니다. (componentDidMount, componentDidUpdate 의 기능이 통합)
- clean-up 이 필요한 effects 의 경우에는 아래와 같이 clean-up 함수를 effect 함수의 반환값으로 넘겨줍니다. clean-up 함수는 컴포넌트가 마운트 해제되는 때에 실행됩니다. (componentWillUnmount 기능)

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시합니다.
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

- 또한 위에서 이야기 했다시피 Hook 이 탄생한 동기가 된 문제중 하나가 class 컴포넌트의 생명주기 메서드가 관련이 없는 로직들을 강제로 모아놓는 문제였습니다.
- useEffect 는 useState 를 여러개 사용 할 수 있는 것 처럼 useEffect 를 여러개 사용하여 서로 관련이 없는 로직들을 갈라놓을 수 있습니다. (아래 코드처럼)

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

- 또한 effect 함수는 모든 렌더링 이후에 항상 실행되기에 때때로 성능 저하를 발생시킬 수 있습니다.
- 위 문제를 해결하기 위해 useEffect 에서는 특정 값들이 리렌더링시에 변경되지 않는다면 effect 함수를 건너뛰도록 할 수 있습니다.
- 아래 예시 코드처럼 useEffect 의 선택적 인수인 두번째 인수로 배열을 넘기면 됩니다.

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때만 effect를 재실행합니다.
```

- 이는 렌더링이 일어날때마다 두번째 인수로 넘긴 배열의 값이 이전 렌더링시와 비교해 변경되었는지를 확인한 후 변경 되었을 경우에만 effect 함수를 실행시키도록 해줍니다.
- 또한 위 방법을 이용해 두번째 인자로 빈 배열([])을 넘겨 리액트로 하여금 effect가 어떠한 값에도 의존하지 않으므로 재실행 될 필요가 없이 마운트와 마운트 해제 시 딱 한번씩만 실행하면 된다고 알려주는 것입니다.

# useContext
---
- 일반적으로 리액트의 데이터는 위에서 아래로 props 통해 전달되지만 여러 컴포넌트에서 동일한 값을 사용해야 할 경우에는 일일히 props 를 전달하는 과정이 번거로울 수 있습니다.
- 리액트는 트리 단계마다 일일이 props를 넘겨주지 않아도 트리 전체에 데이터를 제공할 수 있는 context 라는 기능을 제공합니다.
- 아래는 context 기능을 사용하는 코드 예시입니다.

```jsx
// context를 사용하면 모든 컴포넌트를 일일이 통하지 않고도
// 원하는 값을 컴포넌트 트리 깊숙한 곳까지 보낼 수 있습니다.
// light를 기본값으로 하는 테마 context를 만들어 봅시다.
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Provider를 이용해 하위 트리에 테마 값을 보내줍니다.
    // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있습니다.
    // 아래 예시에서는 dark를 현재 선택된 테마 값으로 보내고 있습니다.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 이젠 중간에 있는 컴포넌트가 일일이 테마를 넘겨줄 필요가 없습니다.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 현재 선택된 테마 값을 읽기 위해 contextType을 지정합니다.
  // React는 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용할 것입니다.
  // 이 예시에서 현재 선택된 테마는 dark입니다.
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

- useContext 는 위 기능을 함수형 컴포넌트에서 사용 가능하도록 해주는 내장 Hook API 입니다.
- 위 예시 코드에서 `static contextType = ThemeContex` 의 역할과 동일하며 context 를 읽고 context 의 변경을 구독하는 것만 가능합니다.
- context 의 현재 값은 트리 안에서 이 Hook 을 호출하는 컴포넌트에 가장 가까이에 있는 Provider 의 value prop에 의해 결정됩니다.
- 아래 예시 코드는 위 예시 코드에서 ThemedButton 컴포넌트를 아래처럼 함수형 코드로 변경하여 useContext 를 사용하였습니다.

```jsx
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

- 이렇게 useState, useEffect, useContext 는 기본 내장 Hook 이며 아래에서 소개하는 Hook API 는 추가 API 들입니다.

# useReducer
---
- useState 의 대체 함수로 `(state, action) => newState`의 형태로 reducer를 받고 dispatch 메서드와 짝의 형태로 현재 state를 반환합니다.
- 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우에 보통 useState보다 useReducer를 선호합니다.
- 아래는 useState 를 사용해 작성 한 카운트 예제를 useReducer 를 사용하도록 변경 한 예시 코드입니다.

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

# useCallback

---

- useCallback 은 인자로 인라인 콜백과 그것의 의존성 값의 배열을 전달하여 해당 콜백의 메모이제이션된 버전을 반환하는 Hook API 입니다.
- 이것은 불필요한 렌더링을 방지하기 위해 참조의 동일성에 의존적인 최적화된 자식 컴포넌트에 콜백을 전달할 때 유용합니다.
- 아래는 예시 코드입니다.

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

- 의존성 값의 배열이 콜백에 인자로 전달되지는 않지만 개념적으로 콜백 함수가 무엇일지를 표현하는 방법으로 콜백 안에서 참조되는 모든 값은 의존성 값의 배열에 나타나야 합니다.

# useMemo
---
- useMemo 는 "생성(create)" 함수와 그것의 의존성 값의 배열을 인자로 전달하면 메모이제이션 된 값을 반환하는 Hook API 입니다.
- useMemo 는 의존성이 변경되었을 때에만 메모이제이션 된 값만 다시 계산 할 것입니다.
- useMemo 로 전달 된 함수는 렌더링 중에 실행되므로 side effecet 행동을 useMemo 에서 하면 안됩니다.
- useMemo 는 성능 최적화를 위해 사용 할 수 있지만 의미상으로 보장된다고 생각하면 안됩니다. useMemo 를 사용하지 않고도 동작 할 수 있도록 코드를 만들고나서 useMemo 를 추가해 성능을 최적화 하세요.
- 아래는 예시 코드입니다.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- `useCallback(fn, deps)` 과 `useMemo(() => fn, deps)` 는 같습니다.

# useLayoutEffect
---
- useLayoutEffect 는 시그니처는 useEffect 와 거의 동일하나 모든 DOM 변경후에 동기적으로 발생하는 Hook API 입니다.
- useLayoutEffect 는 DOM에서 레이아웃을 읽고 동기적으로 리렌더링 하는 경우에 사용하세요.
- useLayoutEffect 의 내부에 예정된 갱신은 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행될 것입니다.
- 이 외의 추가 Hook API 는 아래 링크에서 확인 바랍니다.
    - [https://ko.reactjs.org/docs/hooks-reference.html](https://ko.reactjs.org/docs/hooks-reference.html)

# 자신만의 Hook 만들기
---
- 위에서 이야기 했듯이 자신만의 Hook 을 만들어 컴포넌트 로직을 함수로 뽑아내어 재사용 할 수 있습니다.
- 예를 들어 친구가 온라인 상태인지 아닌지에 대한 메시지를 표시하는 컴포넌트가 있었는데 연락처 목록 컴포넌트에서 온라인 상태인 사용자들의 이름에 초록색 표시를 해줘야 하는 상황에서 비슷한 로직을 복사해 사용하기 보다 자신만의 Hook 을 만들어 로직을 공유하도록 할 수 있습니다.
- 클래스형 컴포넌트에선 위같은 방법을 사용하기 위해 [Render Props](https://ko.reactjs.org/docs/render-props.html) 나 [HOCs](https://ko.reactjs.org/docs/higher-order-components.html) 등의 기법을 사용해야 했으나 custom Hook 을 이용해 트리에 컴포넌트를 더하지 않고 위 문제를 해결 할 수 있습니다.
- 사용하는 방법은 아래 예시 코드와 같이 공유하고자 하는 Hook 로직을 또 다른 함수로 분리하여 이름이 use 로 시작하는 자바스크립트 함수로 추가하면 됩니다. (사용자 Hook 에서는 다른 Hook 을 호출 할 수 있습니다.)

```jsx
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

- custom Hook 함수에서도 다른 모든 Hook 은 최상단에 위치해야 하며 custom Hook 은 조건부 함수가 아니어야 합니다.
- React 컴포넌트와 달리 custom Hook 은 특정한 시그니처가 필요 없이 무엇을 인수로 받아야 하며 무엇을 반환할지를 모두 사용자가 결정 할 수 있습니다.
- 아래는 위에서 작성 한 custom Hook 을 사용하는 예시 코드입니다.

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

- 하지만 이는 custom Hook 을 사용하는 다수의 컴포넌트가 동일한 state 를 공유한다는 뜻은 아닙니다.
- custom Hook 은 상태 관련 로직을 재사용 하는 메커니즘일 뿐 custom Hook 을 사용할 때 마다 그 안의 state 와 effect 는 완전히 독립적입니다.
- 각각의 Hook 에 대한 호출은 서로 다른 state 를 받고 React 관점에서 이 컴포넌트는 custom Hook 에서 사용한 useState 와 useEffect 등의 Hook API 를 직접 호출 한것과 다름 없습니다.
- 위에서 이야기한 내장 Hook API 중 useReducer 같은 경우도 아래 코드와 같이 useState 를 이용한 custom Hook 으로 간단히 만들어 사용 할 수 있지만 보편적 필요성을 고려해 React 에 내장되어 있을 뿐입니다.

```jsx
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

```jsx
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

## 이후 작성 할 내용
---
1. [Redux](https://www.notion.so/Redux-112e3e2a78fb472680e6cb1bf74ba604?pvs=21)

## 추가로 읽어보면 좋을 아티클
---
- [[번역] 심층 분석: React Hook은 실제로 어떻게 동작할까?](https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/)
- [[번역] useEffect 완벽 가이드](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko)
- [[React] 리액트를 처음부터 배워보자. —01. React.js란 무엇인가?](https://medium.com/react-native-seoul/react-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90-01-react-js%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-ad8ba252ee28)

## 참고 자료
---
- [React 공식 문서 - Hook](https://ko.reactjs.org/docs/hooks-intro.html)