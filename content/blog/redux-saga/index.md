---
title: Redux-Saga
description: 리덕스 사가에 대해 알아봅니다.
date: 2021-02-01
---
> ⚠️ 해당 글의 내용과 예시 코드, 이미지는 모두 참고 자료에서 가져 와 정리 한 것입니다.

지난번에 [Redux](/redux) 에 대해서 알아보았는데요. 이번엔 Redux Middleware 중 현재 가장 핫하다고 할 수 있는 Redux-Saga 에 대해 알아보도록 하겠습니다.

Redux-Saga 에서는 ES6 의 Generator 를 사용하고 있기 때문에 이에 대한 기본적인 내용은 이전 [자바스크립트 Iterator](/js-iterator) 글을 참고해주세요.

# Redux-Saga 개요
---
- redux-saga 는 리액트/리덕스 애플리케이션의 데이터 fetching 이나 브라우저 캐시 접근등의 순수하지 않은 비동기 동작, 즉 사이드 이팩트 동작들을 더 쉽고 좋게 만드는 것을 목적으로 하는 리덕스 미들웨어입니다.
- saga 는 애플리케이션에서 사이드 이팩트만을 담당하는 별도의 쓰레드 같은 것으로 보면 됩니다.
- redux-saga 는 비동기 흐름을 쉽게 읽고, 쓰고, 테스트 할 수 있도록 도와주는 ES6 의 Generator 를 사용합니다. (async/await 와 비슷하지만 generator 는 redux-saga 에게 필요한 몇가지 피쳐를 더 가지고 있다고 합니다.)

# Redux-Thunk 와의 차이점
---
- redux-thunk 는 함수를 디스패치 할 수 있도록 하는 미들웨어 였습니다.
- redux-saga 는 이와 대조적으로 액션을 모니터링하고 있다가, 특정 액션이 발생하면 이에 따른 특정 작업을 하는 방식으로 작동하여 콜백지옥에 빠지지 않고 비동기 흐름들을 쉽게 테스트 할 수 있으며 액션들을 순수하게 유지할 수 있습니다.
- redux-saga 는 아래와 같은 reudx-thunk 로는 불가능한 다양한 비동기 작업들을 처리 할 수 있습니다.
    1. 비동기 작업을 할 때 기존 요청을 취소 처리 할 수 있습니다
    2. 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치되게끔 하거나, 자바스크립트 코드를 실행 할 수 있습니다.
    3. API 요청이 실패했을 때 재요청하는 작업을 할 수 있습니다.
    4. 등등의 까다로운 비동기 작업의 처리가 가능합니다.

# Redux-Saga 로 비동기 카운터 만들어보기
---
- redux-saga 의 사용법을 간단히 알아보기 위해 간단한 카운터 예시를 만들어 보도록 하겠습니다.
- 우선 리액트/리덕스 환경에서 아래와 같이 동작 가능한 간단한 카운터 예시를 만들어주세요.

```jsx
// modules/counter.js

const INCREMENT = 'counter/INCREMENT'
const DECREMENT = 'counter/DECREMENT'

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })

const initState = {
  count: 0
}

export default function counter(state=initState, action) {
  switch(action.type) {
    case INCREMENT:
      return {...state, count: state.count+1}
    case DECREMENT:
      return {...state, count: state.count-1}
    default:
      return state
  }
}
```

```jsx
// modules/index.js

import { combineReducers } from "redux"

import counter from './counter'

export default combineReducers({
  counter
})
```

```jsx
// index.js

import "@babel/polyfill"

import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './modules'

import Counter from './Counter'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}><Counter /></Provider>,
  document.getElementById('app')
)
```

```jsx
// Counter.js

import { useDispatch, useSelector } from "react-redux"
import { increment, decrement } from '../modules/counter'

const Counter = () => {
  const count = useSelector(state => state.counter.count)

  const dispatch = useDispatch()
  const onIncrement = () => dispatch(increment())
  const onDecrement = () => dispatch(decrement())

  return (
    <div>
      Count: {count}
      <div>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    </div>
  )
}

export default Counter
```

- 위 카운터 예시에서 redux-saga 를 이용해 버튼을 누를 시 카운트가 비동기적으로 변경되도록 수정해보도록 하겠습니다.
- 우선 counter 모듈을 아래와 같이 수정해주세요.

```jsx
// modules/counter.js

import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

const INCREMENT = 'counter/INCREMENT'
const DECREMENT = 'counter/DECREMENT'
// ASYNC 액션 추가
const INCREMENT_ASYNC = 'counter/INCREMENT_ASYNC'
const DECREMENT_ASYNC = 'counter/DECREMENT_ASYNC'

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
// ASYNC 액션 생성 함수 추가
export const incrementAsync = () => ({ type: INCREMENT_ASYNC })
export const decrementAsync = () => ({ type: DECREMENT_ASYNC })

// 특정 액션이 디스패치 되면 실행 할 사가 함수를 generator 함수로 작성
function *incrementSaga() {
  yield delay(1000) // delay: {첫번째 인자}ms 대기 후 아래 코드 실행
  yield put(increment()) // put: {첫번째 인자} 액션을 디스패치
}

// 위와 동일
function *decrementSaga() {
  yield delay(1000)
  yield put(decrement())
}

// 위 두 액션을 모니터링 하는 사가 함수 (루트 사가에서 사용 하기 위해 export)
export function *counterSaga() {
	// takeEvery: {첫번째 인자} 액션이 디스패치 되면 모두 {두번째 인자} 함수를 실행
  yield takeEvery(INCREMENT_ASYNC, incrementSaga)
	// takeLatest: {첫번째 인자} 액션이 디스패치 되면 {두번째 인자} 함수를 실행하는데
	// 실행 도중 동일한 액션이 디스패치되면 이전에 실행중이던 작업은 무시하고 마지막 디스패치로 사가 함수를 다시 실행
  yield takeLatest(DECREMENT_ASYNC, decrementSaga)
}

const initState = {
  count: 0
}

export default function counter(state=initState, action) {
  switch(action.type) {
    case INCREMENT:
      return {...state, count: state.count+1}
    case DECREMENT:
      return {...state, count: state.count-1}
    default:
      return state
  }
}
```

- 그리고 루트 리듀서를 만든 곳에 만든 사가를 모두 합친 루트 사가를 만들어줍니다.

```jsx
// modules/index.js

import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import counter, { counterSaga } from './counter'

export function *rootSaga() {
  yield all([counterSaga()])
}

export default combineReducers({
  counter
})
```

- 그리고 store 를 생성한 곳에서 saga 미들웨어를 생성하고 미들웨어로 추가해준 뒤 루트 사가를 실행해줍니다.

```jsx
// index.js

import "@babel/polyfill";

import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './modules'

import App from './App'

// saga 미들웨어 생성
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
	// 위에서 생성한 사가 미들웨어를 적용
  applyMiddleware(sagaMiddleware)
)

// 루트 사가를 실행시켜주어야 함. (스토어 생성이 된 이후에 실행을 시켜줘야 함)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
)
```

```jsx
// index.js

import "@babel/polyfill";

import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './modules'

import Counter from './Counter'

// saga 미들웨어 생성
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
	// 위에서 생성한 사가 미들웨어를 적용
  applyMiddleware(sagaMiddleware)
)

// 루트 사가를 실행시켜주어야 함. (스토어 생성이 된 이후에 실행을 시켜줘야 함)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}><Counter /></Provider>,
  document.getElementById('app')
)
```

- 그리고 Counter 컴포넌트에서 비동기 액션을 사용하도록 바꿔주면 됩니다.

```jsx
// Counter.js

import { useDispatch, useSelector } from "react-redux"
import { incrementAsync, decrementAsync } from '../modules/counter'

const Counter = () => {
  const count = useSelector(state => state.counter.count)

  const dispatch = useDispatch()
	// 디스패치에 넘길 액션을 Async 액션으로 변경
  const onIncrementAsync = () => dispatch(incrementAsync())
  const onDecrementAsync = () => dispatch(decrementAsync())

  return (
    <div>
      Count: {count}
      <div>
        <button onClick={onIncrementAsync}>+</button>
        <button onClick={onDecrementAsync}>-</button>
      </div>
    </div>
  )
}

export default Counter
```

- 이제 버튼 클릭 시 카운트가 비동기적으로 변경 되는 것을 확인 하실 수 있습니다.

# Redux-Saga 로 프로미스 다루기
---
- redux-saga 는 주로 비동기 통신에 이용되는 미들웨어기에 데이터를 반환하는 가짜 api 함수를 만들어 프로미스를 통해 다루는 방법을 알아보도록 하겠습니다.
- 우선 위 프로젝트에서 아래와 같이 가짜 api 함수를 만들어주세요.

```jsx
// api/posts.js

const sleep = n => new Promise(res => setTimeout(res, n))

const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어를 배워봅시다',
    body: '리덕스 미들웨어를 직접 만들어보면 이해하기 쉽죠.'
  },
  {
    id: 2,
    title: 'redux-thunk를 사용해봅시다',
    body: 'redux-thunk를 사용해서 비동기 작업을 처리해봅시다!'
  },
  {
    id: 3,
    title: 'redux-saga도 사용해봅시다',
    body:
      '나중엔 redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼 거예요.'
  }
]

export const getPosts = async () => {
  await sleep(500)
  return posts
}
```

- 그리고 아래와 같은 posts 모듈을 만들어주세요.

```jsx
// modules/posts.js

import { call, put, takeEvery } from 'redux-saga/effects'
import * as postAPI from '../api/posts'

const GET_POSTS = 'posts/GET_POSTS'
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS'
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR'

export const getPosts = () => ({type: GET_POSTS})
export const getPostsSuccess = posts => ({type: GET_POSTS_SUCCESS, payload: posts})
export const getPostsError = e => ({type: GET_POSTS_ERROR, error: true, payload: e})

function *getPostsSaga() {
  try {
    const posts = yield call(postAPI.getPosts) // call: 첫번째 인자가 프로미스를 반환한다면 프로미스가 끝날 때 까지 suspend 해줍니다.
    yield put(getPostsSuccess(posts))
  } catch(e) {
    yield put(getPostsError(e))
  }
}

export function *postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga)
}

const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null
  }
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null
        }
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: action.error
        }
      };
    default:
      return state;
  }
}
```

- 그 후 추가한 사가와 리듀서를 루트 사가와 루트 리듀서에 각각 추가를 해줍니다.

```jsx
// modules/index.js

import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from './counter'
import posts, { postsSaga } from "./posts";

export function *rootSaga() {
  yield all([counterSaga(), postsSaga()])
}

export default combineReducers({
  posts,
  counter
})
```

- 그리고 위 모듈을 사용 할 컴포넌트를 추가해주세요.

```jsx
// PostListContainer.js

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPosts } from './modules/posts';

const PostListContainer = () => {
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return <PostList posts={data} />;
}

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
}

export default PostListContainer;
```

- 위 컴포넌트를 랜더링 하면 포스트 목록을 불러오는 모습을 보실 수 있습니다.

## 참고 자료
---
- [(번역) redux-saga](https://mskims.github.io/redux-saga-in-korean/)
- [7장. 리덕스 미들웨어](https://react.vlpt.us/redux-middleware/)