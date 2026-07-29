---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: Post
permalink: /
title: About
custom_css: about
---

<div class="profile-container">
  <div class="profile-image">
    <img src="/assets/img/profile.jpg" alt="프로필 이미지">
  </div>

  <div class="profile-text">
    <p class="greeting">안녕하세요. 서비스 개발하는 <strong>김승엽</strong>입니다.</p>

    <h2 class="section-title">Introduce</h2>
    <p>기술은 가치를 잘 제공하기 위한 <strong>수단</strong>이라고 생각합니다.</p>
    <p>항상 <strong>왜</strong>에 대해 질문하고 고민해야 한다고 생각합니다.</p>
    <p>모든 일은 <strong>협업</strong>이 가장 중요하다고 생각합니다.</p>
    <p>웹 개발을 주로하며 FE 파트 리딩 경험이 있습니다.</p>

    <h2 class="section-title">Contact</h2>
    <p><a href="mailto:shas15@kakao.com">shas15@kakao.com</a></p>
    <p><a href="tel:+8210-7154-2156">010 7154 2156</a></p>
  </div>
</div>

<div class="content-section">
  <h2 class="section-title">Skill</h2>
  <ul class="simple-list">
    <li>React, React Native, Typescript, SCSS, Webpack, Vite</li>
    <li>Claude Code, Codex, Cursor</li>
  </ul>
</div>

<div class="content-section">
  <h2 class="section-title">Education</h2>
  <ul class="simple-list">
    <li><span class="date-text">현재-</span> 한양사이버대학교 재학</li>
    <li><span class="date-text">2014.03-2017.02</span> 선린인터넷고등학교 웹운영과(현 소프트웨어과)</li>
  </ul>
</div>

<div class="content-section">
  <h2 class="section-title">Work Experience</h2>

  <div class="content-item">
    <h3 class="item-title">(주)자인원 <span class="item-title-gray">(마이다스그룹)</span></h3>
    <p class="item-subtitle">2021.08-2025.10 | <strong>Frontend Developer, FE Part Lead</strong></p>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">뉴로우 웹, 앱 프론트엔드 개발 <span class="date-text">| 2023.10-2025.10</span></h4>
      <p class="sub-item-desc">소통, 전략, 성찰 기반의 성장 지원 B2B 코칭 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React</span>
        <span class="sub-item-tech-stack-badge">Typescript</span>
        <span class="sub-item-tech-stack-badge">SCSS</span>
        <span class="sub-item-tech-stack-badge">TanStack Query</span>
        <span class="sub-item-tech-stack-badge">Vite</span>
      </div>

      <ul class="simple-list">
        <li><strong>아키텍처 및 인프라 설계</strong>
          <ul class="nested-list">
            <li>모바일 환경의 배포 리스크를 줄이고 공통 디자인 시스템을 효율적으로 적용하기 위해 React Native 기반의 웹앱 아키텍처로 구현</li>
            <li>중복 코드 제거 및 효율적인 프로젝트 관리를 위해 MonoRepo 방식을 도입하여 개발 환경 구축</li>
          </ul>
        </li>
        <li><strong>AI 기반 개발 생산성 향상 주도</strong>
          <ul class="nested-list">
            <li><strong>Cursor IDE 및 문서 중앙화:</strong> 파편화된 도메인 지식과 코드 컨벤션을 레포지토리 내 Markdown(.md) 파일로 통합하고 Cursor Rules로 연동. AI의 도메인 맞춤형 코드 생성 정확도를 높이고 팀 내 문서 접근성을 대폭 개선</li>
            <li><strong>Figma MCP 도입:</strong> 피그마 디자인 파일을 리액트 코드로 빠르게 변환하는 파이프라인을 구축하여 UI 개발 소요 시간 단축</li>
            <li><strong>Playwright MCP 도입:</strong> 정리된 테스트 시나리오를 기반으로 E2E 테스트가 동작할 수 있도록 자동화 환경 구축 및 검증 효율화</li>
            <li><strong>전사 가이드 배포:</strong> 지속 가능하고 일관된 AI 코드 생성을 위한 '프롬프팅 및 규칙 생성 가이드'를 자체 제작하여 전사 개발팀에 배포 및 실무 적용 주도</li>
          </ul>
        </li>
      </ul>
      
      <!-- <ul class="simple-list">
        <li>모바일은 배포 리스크 감소 및 공통 디자인 시스템 사용을 위해 React Native 기반의 웹앱으로 구현</li>
        <li>중첩 코드 공통화를 위해 MonoRepo 방식 도입하여 프로젝트 구축</li>
        <li>AI 기술을 실무에 더 잘 적용하기 위한 방법을 집중 연구 및 도입
          <ul class="nested-list">
            <li>분산된 프로젝트 문서들을 레포지토리 내 MD 파일로 통합 및 Cursor 규칙으로 연동하여, AI의 도메인 맞춤형 코드 생성 정확도를 높이고 개발팀의 문서 관리 효율을 개선함.</li>
            <li>Figma MCP 를 활용하여 피그마에 작업 된 디자인 파일을 리액트 코드로 빠르게 변환되도록 활용</li>
            <li>Playwright MCP 를 활용하여 제품의 기대 동작들을 자연어로 정리하고, 정리된 내용을 토대로 e2e 테스트가 동작할 수 있도록 활용</li>
            <li>지속 가능한 높은 퀄리티의 코드 생성을 위한 프롬프팅 고도화 방법을 가이드화하여 활용</li>
          </ul>
        </li>
      </ul> -->
    </div>
    
    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">(구)뉴로우 애플리케이션 개발 <span class="date-text">| 2022.08-2023.08</span></h4>
      <p class="sub-item-desc">올바른 습관화를 통해 역량 상승에 도움을 주는 B2B 습관화 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React Native</span>
        <span class="sub-item-tech-stack-badge">Typescript</span>
        <span class="sub-item-tech-stack-badge">styled-components</span>
        <span class="sub-item-tech-stack-badge">TanStack Query</span>
        <span class="sub-item-tech-stack-badge">Metro</span>
      </div>
      <ul class="simple-list">
        <li>Code Push 배포 시스템을 구축하여 빠른 배포 및 배포 안정성 확보</li>
        <li>Node.js 로 구축된 백엔드와 프론트엔드간 모델을 공통 레포로 공유하는 시스템을 구축하여 모델 일관성 확보</li>
        <li>제품 내 디자인 시스템을 우선 구축하여 더욱 빠르고 일관된 UI 개발이 가능하도록 함</li>
        <li>클라이언트와 서버 상태를 분리하여 관리하는 상태 관리 도구인 TanStack Query(React Query) 도입하여 상태 관리 방식 효율화</li>
      </ul>
    </div>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">ATS(잡다 기업서비스) 개발 <span class="date-text">| 2021.08-2022.07</span></h4>
      <p class="sub-item-desc">잡다의 구직자중 기업이 원하는 조건의 인재 매칭 및 검증/평가를 도와 간편한 인재 채용을 돕는 ATS 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">Next.js</span>
        <span class="sub-item-tech-stack-badge">Typescript</span>
        <span class="sub-item-tech-stack-badge">SCSS</span>
        <span class="sub-item-tech-stack-badge">Mobx</span>
        <span class="sub-item-tech-stack-badge">Webpack</span>
      </div>
      <ul class="simple-list">
        <li>Serverless 프레임워크를 이용해 서버리스 방식으로 호스팅</li>
        <li>전체적인 구조 설계, 인증 및 권한처리, 기업 및 사용자 관리, 매칭 포지션 생성/수정 기능 작업 담당</li>
      </ul>
    </div>
  </div>

  <div class="content-item">
    <h3 class="item-title">(주)오픈서베이</h3>
    <p class="item-subtitle">2017.10-2020.02 | <strong>Frontend Developer</strong></p>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">세미나 모객 랜딩 페이지 개발 <span class="date-text">| 2020.01-2020.02</span></h4>
      <p class="sub-item-desc">오픈서베이에서 정기적으로 주최하는 세미나의 소개와 참가 모집을 받을 수 있는 세미나 모객 랜딩 페이지</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React</span>
        <span class="sub-item-tech-stack-badge">Less</span>
        <span class="sub-item-tech-stack-badge">Webpack</span>
      </div>
      
      <ul class="simple-list">
        <li>백엔드 연동 없이 정적 웹페이지만으로 개발하였고, 혼자서 화면 기획 및 개발, 운영팀과의 커뮤니케이션까지 모두 담당</li>
        <li>고객 DB는 파닷이라는 외부 마케팅 서비스를 이용하여 파닷에서 신청 폼 페이지를 만든 후, 해당 폼 페이지를 개발한 랜딩 페이지에서 iframe으로 노출하도록 작업</li>
        <li>AWS S3 + AWS Cloudfront를 이용해 호스팅 하였으며, Google Analytics, Facebook Pixel을 연동해 유입 데이터 트래킹 진행</li>
      </ul>
    </div>
    
    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">오픈 애널리틱스(결과 분석 서비스) 개발 <span class="date-text">| 2019.02-2020.01</span></h4>
      <p class="sub-item-desc">사용자들에게 응답받은 결과를 확인/분석할 수 있는 결과 분석 서비스를 새롭게 개편한 오픈 애널리틱스 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React</span>
        <span class="sub-item-tech-stack-badge">Less</span>
        <span class="sub-item-tech-stack-badge">Mobx</span>
        <span class="sub-item-tech-stack-badge">Webpack</span>
      </div>
      <ul class="simple-list">
        <li>사내에 구축되어 있는 배포 및 모니터링 시스템을 이용하기 위해 Spring Boot로 개발된 백엔드와 하나의 서버에서 동작하도록 하나의 프로젝트로 작업</li>
        <li>API 연동 및 상태 관리, 레이아웃 작업, 공통 컴포넌트 작업, react-dnd를 이용한 DnD 작업, 고급 분석 기능 작업등 담당</li>
      </ul>
    </div>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">오베이샵 기술 변경 <span class="date-text">| 2019.01-2019.02</span></h4>
      <p class="sub-item-desc">오베이 유저들이 설문에 응답하고 받은 포인트로 원하는 상품을 구매할 수 있는 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React</span>
        <span class="sub-item-tech-stack-badge">Less</span>
        <span class="sub-item-tech-stack-badge">Mobx</span>
        <span class="sub-item-tech-stack-badge">Webpack</span>
      </div>
      <ul class="simple-list">
        <li>기존에 Node.js + Vue.js로 개발되어 있던 프로젝트를 Spring Boot + React로 변경하는 작업에서 Vue.js → React 작업 담당</li>
        <li>사내에 구축되어 있는 배포 및 모니터링 시스템을 이용하기 위해 Spring Boot로 개발된 백엔드와 하나의 서버에서 동작하도록 하나의 프로젝트로 작업</li>
      </ul>
    </div>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">오픈서베이 DIY 개발 <span class="date-text">| 2018.02-2018.12</span></h4>
      <p class="sub-item-desc">오픈서베이의 개인 고객들이 직접 설문을 생성/관리하여 저렴한 가격에 오픈서베이를 이용할 수 있는 DIY 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React</span>
        <span class="sub-item-tech-stack-badge">Less</span>
        <span class="sub-item-tech-stack-badge">Mobx</span>
        <span class="sub-item-tech-stack-badge">Webpack</span>
      </div>
      <ul class="simple-list">
        <li>처음으로 기획자, 디자이너 분들과 직접 커뮤니케이션하며 기능 및 일정 조율을 함께 담당</li>
        <li>react-intl를 이용해 다국어 지원</li>
        <li>외부 프로젝트에서도 공통으로 사용되어야 하는 헤더는 Pure Javascript로 따로 모듈화</li>
      </ul>
    </div>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">벨루가(백오피스 서비스) 개발 <span class="date-text">| 2018.01-2018.07</span></h4>
      <p class="sub-item-desc">새롭게 개편한 운영팀이 고객의 설문을 생성/관리할 때 사용하는 백오피스 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React</span>
        <span class="sub-item-tech-stack-badge">Less</span>
        <span class="sub-item-tech-stack-badge">Mobx</span>
        <span class="sub-item-tech-stack-badge">Webpack</span>
      </div>
      <ul class="simple-list">
        <li>UI 컴포넌트는 React-Bootstrap 을 사용하였으며, 대량의 데이터를 데이터 테이블을 이용해 다양한 형태로 노출해야 하는 프로젝트 특성상 AG Grid라는 서드파티 라이브러리 사용</li>
        <li>사내에 구축되어 있는 배포 및 모니터링 시스템을 이용하기 위해 Spring Boot로 개발된 백엔드와 하나의 서버에서 동작하도록 하나의 프로젝트로 작업</li>
      </ul>
    </div>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">랜딩 페이지 개발 <span class="date-text">| 2017.11-2018.01</span></h4>
      <p class="sub-item-desc">새롭게 개편한 오픈서베이를 소개하는 랜딩 페이지</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">HTML5</span>
        <span class="sub-item-tech-stack-badge">CSS3</span>
        <span class="sub-item-tech-stack-badge">jQuery</span>
      </div>
      <ul class="simple-list">
        <li>모바일 지원을 위해 Media Query를 이용해 반응형으로 퍼블리싱 하였고, 애니메이션 작업을 위해 CSS Animations 사용</li>
        <li>처음으로 실무에서 신규 구축에 참여한 프로젝트였고 퍼블리싱 작업도 처음으로 담당을 하게 되어 퍼블리싱 공부를 많이 하게 되었고 이후 퍼블리싱을 포함한 웹 프론트엔드 구축을 혼자서 담당할 수 있게 됨</li>
      </ul>
    </div>
  </div>

  <div class="content-item">
    <h3 class="item-title">트래포트(주)</h3>
    <p class="item-subtitle">2016.08-2017.08 | <strong>Frontend Developer</strong></p>

    <hr class="content-divider">

    <div class="sub-item">
      <h4 class="sub-item-title">트래블하우 유지 보수 <span class="date-text">| 2016.08-2017.08</span></h4>
      <p class="sub-item-desc">항공/호텔/액티비티 예약 서비스</p>
      <div class="sub-item-tech-stack">
        <span class="sub-item-tech-stack-badge">React</span>
        <span class="sub-item-tech-stack-badge">CSS3</span>
        <span class="sub-item-tech-stack-badge">Redux</span>
        <span class="sub-item-tech-stack-badge">Webpack</span>
      </div>
      <ul class="simple-list">
        <li>입사 후 React를 이용한 컴포넌트 기반 개발 방법에 대해 처음으로 접하였고, 이후 JS와 React를 중점적으로 공부</li>
      </ul>
    </div>
  </div>
</div>
