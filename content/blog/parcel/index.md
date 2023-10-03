---
title: Parcel
description: 파설 번들러에 대해 알아봅니다.
date: 2021-01-15
---
> ⚠️ 해당 글의 내용과 예시 코드, 이미지는 모두 참고 자료에서 가져 와 정리 한 것입니다.

[Webpack](/webpack) 에 이어 최근 떠오르고 있는 모듈 번들러인 Parcel 에 대해 간단하게 알아보도록 하겠습니다.

(자바스크립트의 모듈과 모듈 번들러에 대한 기본적인 내용은 이전 [Webpack](/webpack) 글을 참고해주세요.)

# Parcel 등장 배경
---
- 웹팩이라는 모듈 번들러는 2012년 출시되었고 아직까지 가장 많은 사랑을 받고 있는 모듈 번들러입니다.
- 하지만 웹팩이라는 모듈 번들러는 실제 프로젝트를 구성하기 위해 복잡한 설정들을 필요로 했고 이로 인해 웹팩에 대한 지식을 공부하고 적용하는 시간을 필요로 했습니다.
- 또한 예전 웹팩은 공식 문서가 친절하지 않았기에 웹팩에 대해 어려움을 느끼는 사람들이 많았고 이는 진입장벽을 높히는 결과가 되었습니다.
- (위는 Webpack3 까지의 이야기이며 Parcel 의 등장 이후 웹팩도 이런 흐름에 맞춰 빠른 업데이트로 많은 복잡한 설정들을 간소화 할 수 있도록 업데이트 되었습니다. 현재 웹팩은 Webpack5 까지 출시되었습니다.)
- 이를 해결하기 위해 CRA(Create React App) 같이 모듈 번들러에 대한 설정을 개발자가 하지 않아도 바로 개발을 착수 할 수 있는 프로젝트들도 등장했습니다.
- 위와 같은 문제를 해결하겠다고 등장한 모듈 번들러가 바로 Parcel 입니다.
- 2017년 출시 된 Parcel 은 무설정(Zero Configuration) 번들러를 표방하였고 별도 설정 없이 빠른 빌드를 할 수 있다는 점을 어필해 큰 인기를 끌고 있습니다.
- 2019년 2년 동안 밑바닥부터 코드를 다시 작성하여 Parcel 1 의 단점을 개선 한 Parcel 2 가 출시되었지만 아직 관련 레퍼런스가 부족한 관계로 이번 글에서는 Parcel 1 에 대한 내용을 중점적으로 다룹니다.

# Parcel 특징
---
- 위에서 말했다시피 Zero Configuration 을 지향하기에 별도 설정 없이 바로 빌드가 가능합니다.
- 또한 Webpack 같은 기존 모듈 번들러와 비교해 빠른 번들 속도를 자랑합니다.
- Assets 을 기반으로 하며 비슷한 유형의 애셋은 같은 번들로 출력하고 다른 유형의 에셋은 자식 번들로 만들어 부모 번들에 참조합니다.
- (에셋은 어떤 파일로든 표현 될 수 있지만 파설은 Javascript, CSS, HTML 과 같은 파일 유형의 에셋은 특별 지원합니다.)
- 또한 애셋을 변환하는대에 사용되는 다양한 트랜스파일러들(Babel, PostCSS 등)을 내장지원하여 별다른 설정 없이 애셋 설정 파일(.babelrc, .postcssrc 등)들을 발견했을 시 파설이 자동으로 변환을 진행합니다.
- HMR, Code Splitting(Dynamic Import), Minify(Production Build), Source Map 등의 기능을 기본으로 지원합니다.
- 의존성 패키지가 필요 할 경우 node_modules 에서 맞는 의존성을 찾고, 만약 찾지 못할 경우 yarn 이나 npm 을 이용해 자동으로 의존성을 설치해줍니다.

# Parcel 기본 사용법
---
- 파설은 별도 설정 없이 아래와 같이 설치 이후에 바로 사용이 가능합니다.
- 우선 아래 명령어로 parcel 을 설치하고 파설을 사용 할 프로젝트를 npm 으로 세팅합니다.

```bash
npm i -g parcel-bundler
npm init -y
```

- 그리고 아래와 같이 index.html, index.js, main.js, main.css, background.jpg 총 5개의 파일을 추가합니다.

```html
<!-- index.html -->

<html>
<body>
	<div class="main">Hello Parcel</main>
  <script src="./index.js"></script>
</body>
</html>
```

```jsx
// index.js

import main from './main' // js 모듈
```

```jsx
// main.js

import classes from './main.css' // css 모듈

console.log('hello')
```

```css
/* main.css */

.main {
	background: url('./background.jpg'); /* image 모듈 */
	color: red;
}
```

- 그리고 터미널에서 아래 명령어를 직접 입력하거나 package.json scripts 객체에 넣어 실행합니다.

```bash
parcel index.html # webpack 과 달리 js 파일이 아닌 애셋도 진입점(entry)으로 사용이 가능합니다. (주로 html 파일을 사용)
```

- 그럼 기본적으로 dist 폴더에 번들링 결과물 파일이 생겨나며 HMR 을 지원하는 내장 개발용 서버를 구동해 [http://localhost:1234](http://localhost:1234) 로 접속 시 확인이 가능해집니다. (추가로 .cache 폴더에 캐싱 정보가 저장 됨)
- 만일 사용 한 css 파일을 scss 파일로 변경해 사용하고 싶다면 그냥 코드만 아래와 같이 변경해줍니다.

```scss
/* main.css -> main.scss */

.main {
	background: url('./background.jpg'); /* image 모듈 */
	color: red;
}
```

```jsx
// main.js

import './main.scss'

console.log('hello')
```

- 그리고 저장을 하면 자동으로 package.json 의 devDependencies 에 sass 의존성이 추가되며 node_modules 에 sass 모듈이 설치되어 바로 사용이 가능해집니다.
- 이후 아래 명령어를 이용해 Production 용으로 빌드가 가능합니다.

```bash
parcel build index.html
```

# Parcel 장점
---
- 위까지 간단한 사용법을 보았고 깊게 알아보진 않았지만 장단점을 이야기 해보겠습니다. (제 주관적인 의견이며 정말 간단히만 사용해 보았기에 틀린 내용이 있을 수 있을 수 있습니다)
- 우선 Zero Configuration 이라고 이야기 한 것처럼 아무 설정없이 모듈 번들러의 기능들을 쉽게 사용 할 수 있어서 파설을 사용 할 경우 모듈번들러에 대한 이해가 없어도 쉽게 프로젝트를 시작 할 수 있을 것 같습니다.
- 또한 HMR 이나 Code Splitting, 자동 의존성 추가 같은 기능들도 개발 시간을 단축해 줄 수 있겠다는 생각이 듭니다.

# Parcel 단점
---
- (제 주관적인 의견이며 정말 간단히만 사용해 보았기에 틀린 내용이 있을 수 있을 수 있습니다)
- 아직 출시된지 오래 되지 않았기에 Webpack 에 비교해 레퍼런스가 많이 부족한 것이 가장 큰 단점으로 보여집니다.
- 또한 웹팩처럼 디테일한 번들링 설정을 위한 다양한 Customizing 기능에 대한 지원이 아직까진 부족 한 것으로 보입니다. (parcel-plugin 으로 확장 플러그인을 추가 하기 쉽다고 되어 있지만 위 내용과 마찬가지로 레퍼런스 부족으로 가져다 사용할 수 있는 플러그인은 많지 않아 보입니다.)

## 이후 작성 할 내용
---
1. Rollup
2. Snowpack

## 참고 자료
---
- [Parcel 공식 문서](https://ko.parceljs.org/)
- [Parcel - 쉽고 빠르고 강력한 웹앱 번들러](https://heropy.blog/2018/01/20/parcel-1-start/)