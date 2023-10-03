---
title: styled-components
description: CSS-in-JS 와 Styled Components 에 대해 알아봅니다.
date: 2021-04-24
---
> ⚠️ 해당 글의 내용과 예시 코드, 이미지는 모두 참고 자료에서 가져 와 정리 한 것입니다.

오늘은 CSS-in-JS 도구 중 현재 가장 많은 인기를 누리고 있는 styled-components 에 대한 기본적인 내용들에 대해 알아보도록 하겠습니다.

# CSS-in-JS
---
- 2014년 페이스북의 개발자인 Vjeux 는 CSS 에는 아래와 같은 문제점들이 있다고 발표하였습니다.
    - **Global namespace**: 모든 스타일이 global에 선언되어 별도의 class 명명 규칙을 적용해야 하는 문제
    - **Dependencies**: css간의 의존관계를 관리하기 힘든 문제
    - **Dead Code Elimination**: 기능 추가, 변경, 삭제 과정에서 불필요한 CSS를 제거하기 어려운 문제
    - **Minification**: 클래스 이름의 최소화 문제
    - **Sharing Constants**: JS의 상태 값을 공유할 수 없는 문제
    - **Non-deterministic Resolution**: CSS 로드 순서에 따라 스타일 우선 순위가 달라지는 문제
    - **Isolation**: CSS와 JS가 분리된 탓에 상속에 따른 격리가 어려운 문제
- 그리고 페이스북에서는 위 문제를 해결하기 위해 컴포넌트 기반의 자바스크립트 인라인 스타일을 선택했다고 이야기 하였습니다.
- 이렇게 자바스크립트 내부에 스타일을 삽입하는 방법론을 CSS-in-JS 라고 이야기합니다.
- 발표에 관한 더 자세한 내용은 아래 링크를 참고해주세요.
    - [http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html](http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html)
- 이 발표를 시작으로 CSS-in-JS 가 주목받기 시작하며 이후로 다양한 CSS-in-JS 도구들이 생겨나기 시작했습니다.

# styled-components
---
- styled-components 는 CSS-in-JS 도구중 현재 가장 인기있는 라이브러리입니다.
    - 이에 대한 대안으로는 emotion, styled-jsx 등이 있습니다.
- styled-components 는 ES6의 tagged template literals 문법을 통해 스타일을 작성하도록 합니다.
    - tagged template literals 에 대하여는 아래에서 설명합니다.
- styled-components 의 공식 문서에서는 아래와 같은 이점을 제공한다고 이야기합니다.
    - **Automatic critical CSS**: styled-components 는 페이지에 렌더링되는 컴포넌트를 추적하여 필요한 스타일만을 자동으로 삽입해줍니다. 이것은 code splitting 과 함께 최소한의 코드만을 로드한다는 것을 의미합니다.
    - **No class name bugs**: styled-components 는 스타일에 대한 고유한 클래스명을 생성하기 때문에 중복이나 맞춤법 오류등을 신경 쓸 필요가 없습니다.
    - **Easier deletion of CSS**: 일반 CSS 는 클래스 이름이 코드의 어딘가에서 사용되는지 알기가 어려울 수 있습니다. styled-components 는 모든 스타일이 컴포넌트에 연결되므로 사용되지 않는 컴포넌트가 삭제되면 해당 컴포넌트의 스타일도 함께 삭제됩니다.
    - **Simple dynamic styling**: 수십개의 클래스를 수동으로 관리할 필요가 없이 props 나 global theme 를 기반으로 컴포넌트의 스타일을 조정하는것이 간단하고 직관적입니다.
    - **Painless maintenance**: 컴포넌트에 영향을 미치는 스타일을 찾기 위해 여러 파일을 찾아다닐 필요가 없으므로 코드베이스가 아무리 커지더라도 유지관리 하기가 쉽습니다.
    - **Automatic vendor prefixing**: 현재 표준에 따라 CSS 를 작성하면 styled-components 가 알아서 나머지를 처리하도록 합니다.

# tagged template literals
---
- styled-components 에서 사용한다는 tagged template literals 문법이란 ES6 의 템플릿 문자열(template literals)을 발전시킨 하나의 형태입니다.
- tagged template literals 를 사용하면 템플릿 문자열을 함수로 파싱을 할 수가 있습니다.
- 태그 함수의 첫번째 인수는 문자열 값의 배열을 포함하며 나머지 인수는 표현식과 관련됩니다.
- tagged template literals 를 사용하는 예제 코드는 아래와 같습니다.

```tsx
var person = 'Mike';
var age = 28;

function myTag(strings, personExp, ageExp) {

  var str0 = strings[0]; // "that "
  var str1 = strings[1]; // " is a "

  // 사실 이 예제의 string에서 표현식이 두 개 삽입되었으므로
  // ${age} 뒤에는 ''인 string이 존재하여
  // 기술적으로 strings 배열의 크기는 3이 됩니다.
  // 하지만 빈 string이므로 무시하겠습니다.
  // var str2 = strings[2];

  var ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  // 심지어 이 함수내에서도 template literal을 반환할 수 있습니다.
  return str0 + personExp + str1 + ageStr;

}

var output = myTag`that ${ person } is a ${ age }`;

console.log(output);
// that Mike is a youngster
```

- 또한 아래와 같이 나머지 인수를 rest 문법을 사용해 이용 할 수도, 파싱 함수 내에서 string 이 아닌 다른 값을 반환할 수도 있습니다.

```tsx
function template(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

var t1Closure = template`${0}${1}${0}!`;
t1Closure('Y', 'A');  // "YAY!"
var t2Closure = template`${0} ${'foo'}!`;
t2Closure('Hello', {foo: 'World'});  // "Hello World!"
```

# Installation
---
- styled-components 를 사용하기에 앞서 아래 명령어를 통해 의존성 설치를 진행합니다.

```tsx
# with npm
npm i styled-components

# with yarn
yarn add styled-components
```

# Getting Started
---
- 아래와 같이 스타일을 적용 한 컴포넌트를 작성 할 수 있습니다.

```tsx
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
    </Wrapper>
  );
}

export default App;
```

- 위에서 이야기했다시피 styled-components 는 tagged template literals 를 이용해서 스타일을 정의합니다.
- styled.{tagName}`{style}` 방식으로 원하는 태그에 스타일을 적용시킨 스타일 컴포넌트를 정의하고 사용 할 수 있습니다.

# Adapting based on props
---
- styled-components 의 강점중 하나는 스타일 컴포넌트에 props 를 사용 할 수 있다는 점입니다.

```tsx
const Button = styled.button`
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function App() {
  return (
    <div>
      <Button>Normal</Button>
      <Button primary>Normal</Button>
    </div>
  );
}
```

- 위처럼 스타일 컴포넌트의 props 로 전달 한 값을 이용해 스타일을 조정 할 수 있습니다.

# Extending Styles
---
- 또한 다른 스타일 컴포넌트를 이어받아 확장하는 방법도 제공하고 있습니다.

```tsx
const Button = styled.button`
  background: white;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

function App() {
  return (
    <div>
      <Button>Normal Button</Button>
      <TomatoButton>Tomato Button</TomatoButton>
    </div>
  );
}
```

- 이렇게 기존의 스타일 컴포넌트의 일부만 변경을 원하는 경우 기존의 스타일 컴포넌트를 확장하는 새로운 컴포넌트를 정의해 사용 할 수 있습니다.
- 또 경우에 따라 스타일 컴포넌트가 렌더링하는 태그만을 변경하고 싶은 경우가 있을 수 있습니다.
    - 예를 들어 a 태그와 button 태그가 함께 사용되지만 동일한 스타일을 유지해야 하는 경우가 있을 수 있습니다.
- 이런 경우 "as" 라는 prop 을 이용해 스타일 컴포넌트의 태그를 변경하여 렌더링 할 수 있습니다.

```tsx
const Button = styled.button`
  background: white;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function App() {
  return (
    <div>
      <Button>Normal Button</Button>
      <Button as="a" href="/">
        Link with Button Styles
      </Button>
    </div>
  );
}
```

# Styling any component
---
- styled 함수는 스타일 컴포넌트 뿐만 아니라 일반적인 컴포넌트도 확장하여 스타일을 추가할 수 있습니다.

```tsx
const WrapperComponent = ({ children }) => (
  <>
    <a href="/">{children}</a>
    <button>{children}</button>
  </>
);

const StyledWrapperComponent = styled(WrapperComponent)`
  color: palevioletred;
  font-weight: bold;
`;

function App() {
  return (
    <div>
      <WrapperComponent>Unstyled</WrapperComponent>
      <StyledWrapperComponent>styled</StyledWrapperComponent>
    </div>
  );
}
```

# Passed props
---
- 만일 스타일 컴포넌트의 대상이 단순 요소(예. styled.div)일 경우에는 스타일 컴포넌트는 알려져있는 모든 HTML DOM attribute 는 스타일 컴포넌트를 통과시켜 실제 태그에 전달합니다.
- 만일 스타일 컴포넌트의 대상이 리액트 컴포넌트(예. styled(MyComponent))일 경우에는 모든 props 를 통과시켜 리액트 컴포넌트에 전달합니다.

```tsx
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

function App() {
  const [value, setValue] = useState("");
  return (
    <div>
      <Input
        value={value}
        onChange={(e) => { setValue(e.target.value); }}
        type="text"
      />
      <Input
        value={value}
        onChange={(e) => { setValue(e.target.value); }}
        type="text"
        inputColor="rebeccapurple"
      />
    </div>
  );
}
```

# Define Styled Components outside of the render method
---
- 스타일 컴포넌트는 컴포넌트 객체 외부에 정의하는것이 중요합니다.
- 스타일 컴포넌트를 컴포넌트 객체 내부에 정의 할 경우 리렌더링이 일어날 때 마다 스타일 컴포넌트를 재생성 하게 되고, 이는 캐싱이 중단되고 렌더링 속도가 크게 느려지므로 피해야 합니다.

```tsx
const Wrapper = ({ message }) => {
  // WARNING: THIS IS VERY VERY BAD AND SLOW, DO NOT DO THIS!!!
  const StyledWrapper = styled.div`
    /* ... */
  `

  return <StyledWrapper>{message}</StyledWrapper>
}
```

# Attaching additional props
---
- 불필요한 래퍼 방지를 위해 .attrs 생성자를 사용 할 수 있습니다.
- 반환 값은 결과의 props 에도 병합됩니다.

```tsx
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

function App() {
  return (
    <div>
      <Input placeholder="A small text input" />
      <br />
      <Input placeholder="A bigger text input" size="2em" />
    </div>
  );
}
```

- attrs 또한 overriding 이 가능합니다.

```tsx
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  border: 2px solid palevioletred;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

const PasswordInput = styled(Input).attrs({
  type: "password",
})`
  border: 2px solid aqua;
`;

function App() {
  return (
    <div>
      <Input placeholder="A bigger text input" size="2em" />
      <br />
      <PasswordInput placeholder="A bigger password input" size="2em" />
    </div>
  );
}
```

# Animations
---
- @keyframe이 포함된 CSS 애니메이션은 단일 컴포넌트로 범위가 지정되지는 않지만 이름 충돌을 피하기 위해 전역으로 범위가 지정되는 것은 원하지 않습니다.
- 때문에 애플리케이션 전체에서 사용 할 수 있는 고유한 인스턴스를 생성하는 keyframes helper 를 내보냅니다.

```tsx
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg)
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

function App() {
  return <Rotate>&lt; 💅🏾 &gt;</Rotate>;
}
```

- Keyframes 는 lazily injected 가 되며, 이는 코드 분할이 가능해지기 때문에 공유 스타일을 사용할 경우 css helper 를 사용해야 합니다.

```tsx
import styled, { keyframes, css } from "styled-components";

const rotate = keyframes``

// ❌ This will throw an error!
const styles = `
  animation: ${rotate} 2s linear infinite;
`

// ✅ This will work as intended
const styles = css`
  animation: ${rotate} 2s linear infinite;
`
```

# 느낀점
---
- 저는 사실 컴포넌트 로직과 스타일을 하나의 파일에서 관리하는 것이 좋은 방법이라고 생각하지는 않습니다.
- 컴포넌트 로직과 스타일은 관심사가 다르기 때문에 분리가 돼야한다고 생각합니다.
    - 이는 개인적인 생각으로 관심사를 JS, CSS, HTML 로 분리하는것이 아니라 컴포넌트 단위로 분리해야 한다는 이야기가 틀린 이야기라고 생각하는 것은 아닙니다.
    - 하지만 컴포넌트 내에서도 로직과 스타일은 관심사가 다르다고 생각하여 분리하는게 더 좋은 방법이라고 생각합니다.
- 물론 props 등을 이용한 dynamic styling 이나 최소한의 스타일만을 로드하는 Automatic critical CSS 등은 CSS-in-JS 의 큰 장점인 것 같습니다.
- 하지만 그 외에 CSS-in-JS 가 이점으로 내새우는 부분들, Vjeux 가 CSS 의 문제점이라고 이야기 한 부분들의 대부분은 CSS Modules 와 Sass 를 함께 이용하면 해결 할 수 있는 부분이라고 생각합니다.
- 또한 성능면에서도 상태에 따라 JS 를 파싱해 새로운 CSS 코드를 생성해야 하는 CSS-in-JS 에 비해 전처리를 통해 생성한 CSS 파일만을 이용하는 CSS Modules + Sass 를 이용한 방식이 더 나은 퍼포먼스를 보여주는 것으로 알고 있습니다.
- 그러니 CSS-in-JS 가 유행이라고 무조건 사용하는 것이 아닌 본인의 상황에서 더 좋은 방법을 생각해보고 필요한 기술을 적절히 사용해야 할 것 같습니다.
- 개인적으로 styled-components 를 사용하면 JSX 템플릿 코드에 사용되는 스타일 컴포넌트와 일반 컴포넌트의 구분이 어려워서 코딩할 때 오히려 불편함이 생기지는 않을지 하는 생각이 들었습니다.
- 이 부분은 제가 개인적인 프로젝트에서라도 실제로 조금 더 사용을 해보고 직접 느껴봐야 할 것 같습니다.

## 이후 작성 할 내용
---
1. motion
2. Sass(Scss)

## 참고 자료
---
- [styled-components 공식 문서](https://styled-components.com/docs/basics)
- [모던 CSS : 1. CSS-in-JS](https://medium.com/@okys2010/%EB%AA%A8%EB%8D%98-css-1-css-in-js-c1c53d9bbbc9)
- [CSS-in-JS에서 CSS-in-CSS로 바꿔야 하는 이유](https://blueshw.github.io/2020/09/14/why-css-in-css/)