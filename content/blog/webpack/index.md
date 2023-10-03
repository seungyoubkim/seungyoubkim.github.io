---
title: Webpack
description: Webpack 에 대해 알아봅니다.
date: 2021-01-11
---
> ⚠️ 해당 글의 내용과 예시 코드, 이미지는 모두 참고 자료에서 가져 와 정리 한 것입니다.

예전과 달리 거대해진 요즘의 프론트엔드 프로젝트들은 대부분 `모듈 번들러`와 함께 사용 되고 있습니다.

그 중 아직까지는 대중적으로 가장 많은 사랑을 받고 있는 모듈 번들러인 `Webpack(웹팩)`에 대해 알아보도록 하겠습니다.

그 전에 `자바스크립트의 모듈화`와 `Node.js`, `NPM` 에 대해 먼저 간단히 알아보겠습니다.

# 자바스크립트 모듈화
---
- `모듈`이란 `애플리케이션을 구성하는 개별적인 단위`를 이야기 합니다.
- 일반적으로 `파일 단위`로 모듈을 분리하며 모듈을 모아 하나의 큰 모듈을 만들 수도 있습니다.
- `초기 자바스크립트`는 브라우저에서만 사용 될 용도의 단순한 스크립트 언어로 설계되어 모듈 시스템이 존재하지 않아 `모듈화가 불가능` 했습니다.
- 이는 자바스크립트의 활용도가 높아지면서 `변수 충돌, 라이브러리 종속 순서 문제, 코드가 방대해질시 유지보수 문제` 등 여러가지 문제를 일으켰습니다.
- 시간이 지나면서 Ajax의 부상과 Flash 의 몰락, HTML5 의 등장 등과 함께 자바스크립트의 입지가 나날히 증가하였고, 이에 따라 자바스크립트를 브라우저가 아닌 다른 곳에서도 사용하고자 하는 많은 시도들이 등장했습니다.
- 하지만 자바스크립트를 브라우저용 언어를 넘어 범용적으로 사용하기 위해서는 `모듈화`가 반드시 필요했고 그를 위해 `CommonJS, AMD` 같은 모듈 시스템이 등장하게 됩니다.

# Node.js
---
- `Node.js` 는 브라우저 밖에서도 사용하기 위한 시도 중 하나로 2009년 Ryan Dahl 이라는 개발자가 구글 크롬의 자바스크립트 엔진 (V8 Engine) 에 기반해 만든 `자바스크립트 런타임`입니다.
- 쉽게 말해 Node.js 는 `자바스크립트를 브라우저 밖에서도 실행 할 수 있게 해주는 자바스크립트 실행 환경`입니다.
- 위에서 이야기한 모듈 문제는 CommonJS 방식을 채택해 구현해놓아 모듈 시스템을 사용 할 수 있도록 하였습니다.

# NPM
---
- `NPM`은 Node Package Manager 의 약자로 Node.js 에서 사용 할 수 있는 모듈들을 패키지화 하여 모아둔 `자바스크립트 패키지 매니저`입니다.
- 모듈들의 저장소 역할과 패키지 설치 및 관리를 위한 CLI 를 제공하여 `자바스크립트 라이브러리를 편하게 설치하고 관리` 할 수 있도록 도와주는 `모듈 관리자`입니다.

# 브라우저에서의 모듈화
---
- 위에서 이야기 했듯이 Node.js 에서는 CommonJS 가 구현되어 있으므로 별도의 라이브러리 없이 모듈화를 사용 할 수 있지만 `브라우저에서는 여전히 모듈화를 사용 할 수가 없었습니다.`
- 때문에 브라우저에서도 모듈화를 지원하기 위한 `RequireJS` 같은 `모듈 로더`가 등장했고 사용하는 `의존성 모듈들을 빌드 과정을 통해 하나의 스크립트에 포함`시킨 Webpack, Browserify 등의 `모듈 번들러`가 등장했습니다.
- 또한 자바스크립트에서도 `ES2015` 부터 `공식적으로 모듈 시스템이 추가`되었지만 `모듈을 사용 할 파일은 기존 다른 자바스크립트 파일들과 동작방식이 다르고 사용법이 복잡하며 구형 브라우저에서는 지원되지 않는등의 문제` 등으로 인해 모듈 번들러를 통해 변환과정을 거쳐 브라우저에서는 번들링 된 일반 자바스크립트 파일로서 불러오는 방법이 널리 사용되고 있습니다.

## 기존 HTML 에서 script 로 외부 모듈을 불러오는 방법 예시

```html
<!-- ./index.html -->

<html>
  <head>
    <script src="<https://unpkg.com/lodash@4.16.6>"></script> <!-- lodash -->
  </head>
  <body>
    <script src="src/index.js"></script>
  </body>
</html>
```

```jsx
/* ./src/index.js */

var element = document.createElement('div')

element.innerHTML = _.join(['Hello', 'webpack'], ' ') //lodash

document.body.appendChild(component())
```

- `자바스크립트 내에서 모듈을 불러올 수 있는 방법이 없었기에` 위처럼 HTML 에서 원하는 외부 라이브러리 파일의 `CDN URL 을 script 태그로 불러와 사용`해야 했습니다.

## ES2015 에 추가 된 모듈 시스템을 이용해 외부 모듈을 불러오는 방법 예시

```html
<!-- ./index.html -->

<html>
	...
  <body>
    <script type="module" src="src/index.mjs"></script>
  </body>
</html>
```

```jsx
/* ./src/index.mjs */ 

import '../node_modules/lodash/lodash.js'

var element = document.createElement('div')

element.innerHTML = _.join(['Hello', 'webpack'], ' ') //lodash

document.body.appendChild(component())
```

- 위처럼 ES2015 부터 모듈 시스템을 이용 할 수 있게 되었지만 앞서 이야기 한 이유들로 인해 보통은 모듈 번들러를 이용해 모듈화를 사용합니다.

# 모듈 번들러
---
- `웹 애플리케이션을 구성하는 수 많은 자원들을 하나 혹은 적은 수의 파일로 병합 및 압축 해주는 동작`을 `모듈 번들링`이라고 하며, 이런 모듈 번들링을 도와주는 도구를 `모듈 번들러`라고 합니다.
- 이런 번들러가 필요한 가장 큰 이유로는 수많은 모듈들을 적은 수의 모듈로 병합하므로써 `HTTP 요청 수를 줄이려는 목적`에 있습니다.

# Webpack

---

- 앞서 얘기 한 모듈 번들러 중 아직까지 대중적으로 가장 많은 사랑을 받고 있는 도구가 바로 `웹팩`입니다.
- Webpack 이전에도 `Gulp, Grunt` 등의 `자동화 도구`가 있었으나 웹팩은 `자동화 도구의 역할과 함께 모듈 기능 지원, 로딩 최적화등 더욱 다양한 기능들을 지원`했기 때문에 그들의 역할도 대신 수행하게 되었습니다.
- 또한 `코드 압축, 로더` 등의 기능들로 개발에 용이한 다양한 기능들을 편하게 이용 할 수 있게 해줍니다.

## 웹팩으로 해결하려는 문제

1. 자바스크립트 변수 유효 범위 문제
2. 브라우저별 HTTP 요청 숫자의 제약
3. 사용하지 않는 코드 관리
4. Dynamic Imports & Lazy Loading 지원

# 간단한 웹팩 예시
---
- 우선 `npm` 을 이용해 프로젝트를 생성한 뒤 `webpack, webpack-cli, lodash` 라는 3개의 의존성을 설치해 보도록 하겠습니다.

```bash
npm init -y
npm i -D webpack webpack-cli
npm i lodash
```

- 그럼 해당 명령어를 실행 한 폴더 내에 아래와 같은 `package.json` 라는 파일이 생성됩니다.
- 생성 된 package.json 의 `scripts` 객체에 아래와 같은 내용을 추가합니다.

```jsx
// package.json

{
  // ...
	"scripts": {
    // ...
    "build": "webpack" // npm run {key} 명령어로 value 명령어를 실행 할 수 있도록 추가
  },
	// ...
  "devDependencies": {
    "webpack": "^4.42.0",
    "webpack-cli": "^3.3.11"
  },
  "dependencies": {
    "lodash": "^4.17.15"
  }
}
```

<aside> ⚠️ 의존성을 설치 할때 `webpack, webpack-cli` 는 `-D` 라는 조건을 붙혀서 설치를 했고 `lodash` 는 그냥 설치했습니다. 이는 개발용에만 사용되는 라이브러리와 실제 결과물에도 사용되는 라이브러리를 구별하는 역할로 -D 를 붙혀 설치 한 의존성은 package.json 에서 `dependencies` 객체가 아닌 `devDependencies` 객체에 추가되어 `배포용으로 빌드를 할 경우에 해당 라이브러리는 결과물의 번들에 포함되지 않는다`는 차이가 있습니다.

</aside>

- 그리고 아래와 같은 html 과 js 파일을 생성해줍니다.

```html
<!-- index.html -->

<html>
  <head>
    <title>Webpack Demo</title>
  </head>
  <body>
    <script src="./dist/main.js"></script> <!-- 빌드 된 파일 로드 -->
  </body>
</html>
```

```jsx
// index.js

import _ from 'lodash';

var element = document.createElement('div');

element.innerHTML = _.join(['Hello','webpack'], ' ');

document.body.appendChild(component());
```

- 마지막으로 `webpack.config.js` 라는 `웹팩 설정 파일`을 생성 후 아래와 같이 작성해줍니다.

```jsx
// webpack.config.js

var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

- 이제 package.json 파일이 있는 폴더에서 `npm run build` 라는 명령어를 이용하면 폴더내에 파일 구조는 아래와 같아지며 `dist` 폴더 내에 `빌드 된 결과물 파일`이 `main.js` 라는 이름의 파일로 생성되게 됩니다.

```bash
.
├── dist
│   ├── main.js
├── index.html
├── index.js
├── package.json
├── package-lock.json # 의존성 트리에 대한 정보가 작성 된 파일
├── webpack.config.js
```

- `npm 명령어`를 통해 package.json 내에 작성해둔 script 코드로 `webpack-cli 명령어`가 실행되었고 이에 따라 index.js 파일과 lodash 모듈이 함께 번들링 된 dist/main.js 파일이 생성되어 `index.html` 파일을 실행시켜보면 브라우저에 `Hello webpack` 이라는 문장이 출력된 것을 볼 수 있을 것입니다.

# 웹팩 설정 주요 속성 4가지
---
- 웹팩은 위 예시와 같은 방식으로 사용되고 웹팩 설정 파일인 `webpack.config.js` 에 작성해둔 설정 내용에 맞춰 번들링을 진행하게 됩니다.
- 웹팩 설정의 주요 속성으로 `entry, output, module, plugin` 4가지 속성이 있습니다. 하나씩 살펴보도록 하겠습니다.

1. entry
    
    - 빌드를 시작 할 `최초 진입점`인 자바스크립트 파일의 경로입니다.
2. output
    
    - `빌드를 완료 한 결과물`의 파일 경로와 정보입니다.
        
    - output 설정 분석
        
        ```jsx
        // webpack.config.js
        
        var path = require('path') // OS 별로 파일 경로를 입력하는 방식이 다를 수 있기 때문에 사용
        
        module.exports = {
        	// ...
        	output: { // entry 와 다르게 반드시 객체 형태로 입력
        		filename: 'bundle.js', // 번들링 된 결과물의 파일 이름 (다양한 옵션 설정 가능)
        		path: path.resolve(__dirname, 'dist'), // 결과물 파일이 생성 될 경로
        		publicPath: 'dist/' // 빌드 이후 이미지나 파일 같은 외부 리소스를 로드 할 때 참조 할 URL들을 업데이트 해주기 위한 속성 (prefix 개념)
        	}
        	// ...
        }
        ```
        
    - `filename` 옵션 설정 분석
        
        ```jsx
        module.exports = {
        	output: {
        		// 결과 파일 이름에 entry 속성을 포함하는 옵션
        		filename: '[name].bundle.js',
        		// 결과 파일 이름에 웹팩 내부적으로 사용하는 Module ID 를 포함하는 옵션
        		filename: '[id].bundle.js',
        		// 매 빌드시마다 고유 해시 값을 붙이는 옵션 (브라우저 캐싱 방지)
        		filename: '[hash].bundle.js'
        		// entry 기반으로 chunk에 따라 해시 값을 붙이는 옵션 (브라우저 캐싱 방지)
        		filename: '[chunkhash].bundle.js'
        		// 추출 된 content에 의해 계산되는 해시 값을 붙이는 옵션 (브라우저 캐싱 방지)
        		filename: '[contenthash].bundle.js'
        	}
        }
        ```
        
3. module (loader)
    
    - 웹팩이 웹 애플리케이션을 해석 하며 빌드를 진행 할 때 `비 자바스크립트 파일을 웹팩이 인식 할 수 있게 변환 해주는 로더를 추가`하는 속성입니다.
        
    - 로더 설정 분석
        
        ```jsx
        // webpack.config.js
        
        module.exports = {
        	// ...
        	module: { // 로더 속성
        		rules: [ // 로더를 적용 할 규칙 모음
        			{
        				test: /\\.css$/, // 아래 로더를 적용 할 파일을 구분 할 조건으로 주로 정규식을 사용
        				use: ['style-loader', 'css-loader'] // 위 정규식으로 찾은 파일들에 적용 할 로더들
                // use 에 적힌 로더들은 기본적으로 오른쪽에서 왼쪽 순서로 적용 됨 (배열 내에서 줄바꿈을 했다면 아래에서 위 순서)
        				// css-loader: css 파일을 웹팩이 읽을 수 있도록 도와주는 로더
        				// style-loader: css 파일에서 읽어 온 style을 html head 에 삽입해주는 로더
        			},
        			{ // 아래와 같이 로더 배열을 string 배열이 아닌 객체 배열로 입력 해 옵션을 포함 할 수도 있음
        				test: /\\.scss$/,
        				use: [
        					{ loader: 'style-loader' },
        					{
        						loader: 'css-loader',
        						options: { modules: true }
        					},
        					{ loader: 'sass-loader' },
        				]
        			},
        			{
        				test: /\\.js$/,
        				use: ['babel-loader'],
        				exclude: /node_modules/
        			}
        		]
        	}
        }
        ```
        
    - 아래 주소에서 다양한 웹팩 로더들을 확인 하실 수 있습니다.
        
        - [https://webpack.js.org/loaders/](https://webpack.js.org/loaders/)
4. plugin
    
    - 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성입니다.
    - 로더랑 비교한다면 `로더`는 `파일을 해석하고 변환하는 과정에 관여`하는 반면, `플러그인`은 `빌드 된 결과물의 형태를 바꾸는 역할`을 합니다.
    - 플러그인 배열에는 생성자 함수로 생성 한 `객체 인스턴스`만 추가가 가능합니다.
    - `웹팩 변환 과정 전반에 대한 제어권`을 갖고 있습니다.
    - 아래 주소에서 다양한 웹팩 플러그인들을 확인 하실 수 있습니다.
        - [https://webpack.js.org/plugins/](https://webpack.js.org/plugins/)

- `그 외에도 다양한 속성들이 존재`하지만 위 4개가 웹팩에서 가장 중요한 핵심 속성이라고 이야기 할 수 있습니다.

# 그 외 웹팩 설정 속성 몇가지
---
1. mode
    - Webpack4 부터 추가 된 속성으로 `빌드 모드`를 설정 할 수 있는 속성입니다.
    - `none, development, production` 세가지 속성중에 선택하여 사용합니다.
2. resolve
    - `모듈 탐색 방법`을 웹팩이 제공하는 기본값 외에 더 디테일 한 탐색 방법을 설정하기 위한 속성입니다.
3. optimization
    - 웹팩은 설정한 모드에 따라 빌드시에 자동으로 `코드 최적화`를 진행하는데 이를 `수동으로 구성 및 재정의` 할 수 있는 속성입니다.
4. devServer
    - `Webpack Dev Server` 를 설정하기 위한 속성 입니다.
5. devtool
    - 개발 과정에서 `번들링 된 파일을 번들링 전 소스코드로 맵핑`해주는 다양한 `source-map` 기능을 설정 할 수 있는 속성입니다.
6. externals
    - 기본적으로 해당 속성을 이용하면 `결과물 파일에서 원하는 종속성을 제외하고 해당 종속성을 최종 사용자의 환경에 존재하는 종속성에 의지`하도록 하는 속성입니다.
    - 일반적으로는 라이브러리 개발자에게 가장 유용한 속성입니다.

# Webpack Dev Server
---
- 웹팩을 사용하면 빌드 된 js 파일을 사용하기 때문에 `코드를 수정 할때마다 구현체를 확인하기 위해 매번 빌드를 다시 돌려줘야 하는 문제`가 발생하는데 그럴 때 사용하는 것이 `Webpack Dev Server` 입니다.
- 웹 애플리케이션을 개발하는 과정에서 `웹팩 빌드 대상 파일이 변경 될 경우 웹팩 명령어를 실행하지 않아도 코드 변경 후 저장만 하면 자동으로 빌드` 후 브라우저를 새로고침 해줍니다.
- 또한 `웹팩 빌드 시간도 줄여줍니다.`
- 웹팩 데브 서버를 실행하여 웹팩 빌드를 하는 경우에는 `빌드 결과물을 메모리에만 저장`하고 파일로는 생성하지 않기 때문에 파일을 직접 보거나 조작 할 순 없지만 `메모리 입출력이 파일 입출력보다 빠르고 자원이 덜 소모되기 때문에` 개발 과정에서는 웹팩 데브 서버를 사용하는 것이 좋습니다.
- 또한 위와 같은 이유로 `실제 배포를 진행 할 경우`에는 웹팩 데브 서버가 아닌 웹팩 명령어를 통해 `빌드 결과물을 파일로 생성`해야 합니다.

# HtmlWebpackPlugin
---
- 한가지 플러그인을 가지고 플러그인을 사용하는 방법에 대해 짧게 알아보도록 하겠습니
- 앞서 이야기 했듯이 `output 에서 filename 옵션을 설정하여 번들링 파일 이름을 동적으로 생성` 할 수 있었습니다.
- 그런데 번들링 된 파일을 그냥 사용하려면 `매번 번들링 파일을 로드하는 HTML 내의 script 코드를 일일히 수정해줘야 한다`는 문제점이 있습니다.
- 위같은 경우에 사용 할 수 있는 플러그인이 바로 `HtmlWebpackPlugin` 입니다.
- 우선 아래 명령어를 사용해 HtmlWebpackPlugin 의존성을 설치합니다.

```bash
npm i -D html-webpack-plugin
```

- 이후 webpack.config.js 파일을 아래와 같이 수정합니다.

```jsx
// webpack.config.js

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './index.html',
  output: {
		// ...
    filename: '[name].[chunkhash].js',
  },
	// ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html' // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
    })
  ]
}
```

- 위처럼 HtmlWebpackPlugin 플러그인을 적용 할 시 `기존 index.html 을 기반으로 모든 웹팩 번들을 포함하는 새로운 index.html 파일이 결과물에 추가`됩니다.

```html
<!-- ./index.html -->

<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack Test</title>
  </head>
  <body>
    <div class="container">
      Please Wait...
    </div>
  </body>
</html>
```

```html
<!-- ./dist/index.html -->

<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack Test</title>
  </head>
  <body>
    <div class="container">
      Please Wait...
    </div>
		<!-- 아래와 같이 자동으로 번들 파일이 추가 됨 (이름은 예시) -->
		<script src="main.fc0536e57e71ae56a831.js"></script>
  </body>
</html>
```

- 위처럼 `빌드 이후 번들링 된 파일을 이용해 새로운 결과물을 만들어내거나 기존 결과물의 형태를 바꿀 때 플러그인을 사용`합니다.

# Development, Production 빌드 분할
---
- 실무에서 웹팩을 사용할 경우 빌드 파일을 `개발 서버에 배포 할 때`와 `프로덕션 서버에 배포 할 때` `웹팩 설정을 다르게 해줘야 하는 경우`가 많습니다.
- 그럴 경우에는 아래처럼 package.json 에서 `빌드 명령어를 분할` 한 후, webpack.config.js 의 `module.exports 에 객체가 아닌 함수를 반환`해주는 방법을 사용 할 수 있습니다.

```json
// package.json

{
	// ...
	"scripts": {
    "dev": "webpack serve", // Webpack Dev Server
    "build-dev": "webpack --mode development",
		"build": "webpack --mode production",
  },
	// ...
}
```

```jsx
// webpack.config.js

var config = {
	mode: 'none',
	entry: './index.html',
	// ...
}

module.exports = (env, args) => {
	if(args.mode === 'production') {
		config.mode = 'production' 
		// ...
	} else {
		config.mode = 'development'
		config.devtool = 'source-map'
		// ...
	}

	return config
}
```

# 번들링 파일 최적화 하기
---
- `모듈 번들러`는 기본적으로 웹 애플리케이션에 사용되는 `수많은 자원들을 하나씩 네트워크로 불러오는데 시간이 오래 걸리는 문제`를 해결하기 위해 `하나의 거대한 파일로 병합 압축을 진행`합니다.
- 하지만 이는 `애플리케이션이 커질수록 번들링 파일의 크기 또한 점점 커지기 때문에 파일 하나를 불러오는데도 오랜 시간이 걸리게 되고 해당 파일이 불러와질때까지 브라우저가 화면을 그리지 못하여` 사용자에게 좋지 않은 경험을 선사하는 경우가 발생하게 되었습니다.
- 이를 해결하기 위해서는 `번들링 파일의 크기를 줄이는 것`과 `번들링 파일을 분할하는 것` 두가지 방법이 있습니다.

# 번들링 파일 크기 줄이기
---
- `Minify(Uglify)`: 가독성을 위해 추가 된 `불필요한 공백, 줄바꿈, 주석 같은 실행에 필요하지 않는 코드들을 제거`해주고 `변수들의 이름등을 최소화` 하도록 변경해주어 파일 크기를 줄이는 방법
- `Tree Shaking`: `export 는 됐지만 import 는 되지 않은 모듈을 제거`하여 파일 크기를 줄이는 방법
- 위와 같은 방법들은 Webpack config 의 `mode` 를 `production` 으로 설정하고 빌드 할 시 `웹팩에서 알아서 코드 최적화를 진행`해줍니다.

# 번들링 파일 분할하기 (Code Splitting)
---
- 번들링 파일 크기를 아무리 줄이더라도 애플리케이션의 크기가 커진다면 사용해야 하는 기능이 많아진다는 뜻이므로 `크기를 줄이는대에는 한계`가 있습니다.
- 그래서 페이지에서 `사용자에게 당장 노출되지 않는 부분`은 `코드를 나눠`서 필요한 시점에 로드 하도록 `번들링 파일을 분할`하는 `Code Splitting` 이라는 기법이 있습니다.
- 우선 첫번째 방법으로 `entry 진입점을 여러개로 분할`하여 `각각의 output 결과물` 을 만들어내는 방법입니다.

```jsx
// index.js

import _ from 'lodash';

console.log(_.join(['Hello', 'webpack'], ' '));
```

```jsx
// another.js

import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));
```

```jsx
// webpack.config.js

module.exports = {
	// ...
  entry: {
    index: './index.js',
    another: './another.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    // ...
  },
  // ...
}
```

- 위처럼 entry 를 나눌 경우 output 파일을 분리 할 수 있게 됩니다.
- 하지만 이러면 `공통으로 사용하는 module 이 각각의 번들에 중복으로 포함되기 때문에 오히려 불러오는 파일의 총 크기가 늘어나는 현상`이 발생합니다.

# SplitChunksPlugin
---
- 위처럼 모듈이 중복으로 번들링되는 현상을 방지하기 위해 `공통으로 사용되는 vendor 파일`은 `SplitChunksPlugin` 을 사용하여 `별도로 번들링` 할 수 있습니다.

```jsx
// webpack.config.js

module.exports = {
	// ...
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
	}
};
```

- 또는 `entry` 의 `dependOn` 속성을 이용해 공통으로 사용 할 모듈을 `공유` 할 수 있습니다.

```jsx
// webpack.config.js

module.exports = {
  entry: {
    index: {
      import: './index.js',
      dependOn: 'shared'
    },
    another: {
      import: './another.js',
      dependOn: 'shared'
    },
    shared: 'lodash'
  },
	// ...
}
```

# Dynamic Imports
---
- 위 같은 방법은 entry 자체를 나누는 방법으로 SPA 서비스에서는 사용하기는 쉽지 않습니다.
- 하지만 SPA 서비스도 내부적으론 페이지가 나뉘어 있으며 당장 필요한 코드가 아니라면 `당장은 로드하지 않아도 되는 코드들`이 많습니다.
- 그래서 `런타임시에 필요한 모듈을 로드하는 방식`을 `Dynamic Imports` 라고 합니다.

```jsx
// index.js

async function getComponent() {
  const element = document.createElement('div');
  const { default: _ } = await import('lodash')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

- 이는 필요한 모듈을 `정적으로 로드하는 대신 필요할때 동적으로 가져와` 사용할 수 있도록 `청크를 분리`합니다.
- 기본적으로 chunk 파일의 이름은 `webpack output` 세팅에 의존하지만 `아래와 같이 코드를 수정해 직접 chunk 파일명을 지정 할 수도 있습니다.`

```jsx
- const { default: _ } = await import('lodash')
+ const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash')
```

# Prefetching/Preloading modules
---
- Webpack 4.6.0 부터 지원되는 기능으로 `당장 필요하지는 않지만 앞으로 필요 할 모듈을 미리 로딩하는 방법`으로 `Prefetch` 와 `Preloading` 이 있습니다.
- Prefetch: 해당 모듈이 페이지 전환중에 사용 될 수 있으니 `브라우저가 여유가 될때 미리 로드`하도록 합니다.

```jsx
import(/* webpackPrefetch: true */ 'module');
```

- Preload: 해당 모듈이 현재 페이지에도 사용 될 수 있으니 `호출 즉시 로드`하도록 합니다.

```jsx
import(/* webpackPreload: true */ 'module');
```

# Lazy Loading
---
- 마지막으로 위처럼 `Dynamic Code Splitting` 을 진행해둔 chunk 모듈을 단순히 지체 로드 하는 것이 아닌 `사용자가 해당 코드를 필요로 하는 시점에 로드`하도록 하는 방법을 `Lazy Loading` 이라고 합니다.
- 아래는 `사용자가 버튼을 클릭 할 시 모듈을 로드`하도록 하는 예시 코드입니다.

```jsx
const button = document.createElement('button');
button.innerHTML = 'Click Me!'

button.onclick = e => import('lodash').then(({ default: _ }) => {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
  document.body.appendChild(element);
})

document.body.appendChild(button);
```

- React 에서 Lazy Loading 사용하기: [Code Splitting and Lazy Loading](https://reactrouter.com/web/guides/code-splitting)

## 이후 작성 할 내용
---
1. [Parcel](/parcel)
2. Webpack 5

## 참고 자료
---
- [프론트엔드 개발자를 위한 웹팩](https://www.inflearn.com/course/%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9%ED%8C%A9)
- [웹팩 공식 가이드](https://webpack.js.org/guides/)
- [Dynamic Import 로 웹페이지 성능 올리기](https://pks2974.medium.com/dynamic-import-%EB%A1%9C%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%B1%EB%8A%A5-%EC%98%AC%EB%A6%AC%EA%B8%B0-caf62cc8c375)