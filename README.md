![Image](https://github.com/user-attachments/assets/c187ba17-cd04-442c-92e4-4a9ca3579af0)

<br>

## 🐣 프로젝트 소개

**성장형 취업 준비 서비스, Chick Mate**
<br><br>
Chick Mate의 대표 캐릭터 칰칰이와 함께 AI 면접관을 통해 면접을 연습하는 성장형 면접 준비 서비스입니다.
면접을 준비하는데 어려움을 겪는 취업·이직 준비생이 각자에 맞는 역량을 키울 수 있도록 도와줍니다.

> - **작업 기간** : 2025. 03. 20 ~ 2025. 04. 30
> - **배포 주소** : www.chickmate.site

## 🐥 프로젝트 멤버 소개

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/choichangyeon">
          <img src="https://avatars.githubusercontent.com/u/53289569?v=4" width="80" alt="choichangyeon" /><br />
          <sub><b>choichangyeon</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/parkminjo">
          <img src="https://avatars.githubusercontent.com/u/73922462?v=4" width="80" alt="parkminjo" /><br />
          <sub><b>parkminjo</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/hye410">
          <img src="https://avatars.githubusercontent.com/u/110617039?v=4" width="80" alt="Hye10" /><br />
          <sub><b>Hye10</b></sub>
        </a>
      </td>
    </tr>
    <tr>
      <td width="300px" align="center">
        <b>담당</b><br />
        AI 선택 페이지<br />
        맞춤 채용 공고 페이지
      </td>
      <td width="300px" align="center">
        <b>담당</b><br />
        AI 진행 페이지<br />
        자소서 작성 페이지
      </td>
      <td width="300px" align="center">
        <b>담당</b><br />
        렌딩/온보딩 페이지<br />
        마이페이지 면접 기록 및 탭 관리<br />
        middleware 관리
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/ImJaeOne">
          <img src="https://github.com/ImJaeOne.png" width="80" alt="ImJaeOne" /><br />
          <sub><b>ImJaeOne</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/minchulpack">
          <img src="https://avatars.githubusercontent.com/u/195730631?v=4" width="80" alt="minchulpack" /><br />
          <sub><b>minchulpack</b></sub>
        </a>
      </td>
    </tr>
    <tr>
      <td width="300px" align="center">
        <b>담당</b><br />
        로그인/회원가입 페이지<br />
        캐릭터 및 경험치 관리<br />
        마이페이지 면접 기록<br />
      </td>
      <td width="300px" align="center">
        <b>담당</b><br />
        전체 UI 디자인<br />
      </td>
    </tr>
  </tbody>
</table>

<br />

## ⚙ 프로젝트 기능 소개

- **Next.js 기반의 웹 애플리케이션**입니다.
- **Zustand**를 사용하여 사용자의 캐릭터 ID와 모달 ID 상태를 단순하고 직관적으로 관리합니다.
- **TanStack Query**를 사용하여 유저 정보, 캐릭터, 자소서, 체용 공고 데이터를 비동기적으로 요청하고, 캐싱과 쿼리 무효화를 통해 항상 최신 상태로 유지합니다.
- **Prisma**를 사용하여 **DB 스키마를 설계**하고, 안정적인 데이터베이스 구조를 구축했습니다.
- **Route Handler**를 이용하여 RESTful API를 구현하여, 클라이언트와 서버 간의 데이터 통신을 관리합니다.
- **이메일 회원가입 및 로그인 기능**과 **구글/카카오 기반 소셜 로그인**을 제공합니다.
- **회원 정보 유효성 검사**를 통해 정확한 데이터가 저장되도록 합니다.
- **Tailwind CSS**를 사용하여 반응형 디자인을 적용하였습니다.
- **Vercel**을 통해 프로젝트를 빠르고 안정적으로 배포하였습니다.

<br>

## 🔗 협업 프로세스

- ### 페이지 단위 작업 관리
  - [각 페이지별 이슈](https://github.com/BEST-L2CP/ChickMate/issues?q=is%3Aissue%20state%3Aclosed) 생성
  - 페이지별 feature 브랜치 운영 (`feat/#이슈번호-이슈명`, `refactor/#이슈번호-이슈명`)
- ### [Pull Request 템플릿을 활용한 코드 리뷰](https://github.com/BEST-L2CP/ChickMate/pulls?q=is%3Apr+is%3Aclosed)

<br>

## 🗣️ 기술적 의사결정 과정

- #### [[Git] Git branch 전략 설정](https://chickmate.palms.blog/changyon99-1)
- #### [[클라이언트 상태 관리] 클라이언트 상태 관리 라이브러리 선택 과정](https://chickmate.palms.blog/minjo-1)
- #### [[TypeScript] type 별칭 vs interface 어떤 걸 쓸까요?](https://chickmate.palms.blog/dhye-1)

<br>

## 🚀 트러블 슈팅

- #### [[일반 로그인] 일반 로그인 후 세션이 바로 반영되지 않은 이유](https://chickmate.palms.blog/jaeone-5)
- #### [[소셜 로그인] 소셜 로그인만 안되는 이유?](https://chickmate.palms.blog/jaeone-1)
- #### [[API 통신] NextResponse.json()에서 status를 제대로 보내지 않으면 생기는 일](https://chickmate.palms.blog/jaeone-3)
- #### [[API 통신] RESTful API란?](https://chickmate.palms.blog/jaeone-7)
- #### [[클라이언트 상태 관리] 모달을 전역 상태로 관리했을 때 발생하는 문제](https://chickmate.palms.blog/minjo-2)
- #### [[React Hook] React 조건부 Hook 호출](https://chickmate.palms.blog/changyon99-4)
- #### [[Tailwind CSS] tailwindcss + clsx 동적 스타일이 적용되지 않아요](https://chickmate.palms.blog/dhye-2)
- #### [[Sentry] Sentry로 오류 알림을 보내기 위한 올바른 방법](https://chickmate.palms.blog/jaeone-4)

<br />

## 📁 프로젝트 구조

```markdown
📁 public // 정적 파일 관리
📁 src
┣ 📁 app // page, Route Handler의 엔드 포인트를 관리
┣ 📁 components // 여러 페이지에서 공통으로 사용하는 컴포넌트를 관리
┣ 📁 constants // 자주 변하지 않는 상수를 관리
┣ 📁 features // 각 페이지 기능별 관리 (api, hooks, utils, components 등 포함)
┣ 📁 hooks // 페이지 내부에서 공통으로 사용하는 커스텁 훅을 관리
┣ 📁 lib // 공용 라이브러리 설정, 유틸 함수
┣ 📁 provider // root에 적용하는 Provider 관리
┣ 📁 store // zustand stroe 관리
┣ 📁 styles // css style 관리
┣ 📁 types // type alias 관리
┣ 📁 utils // 공통 유틸 함수 관리
┗ middleware.ts
```

<br />

## 🧶 기술 스택

<div align="left">

## Frontend

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" /> <img src="https://img.shields.io/badge/Zustand-FFDD55?style=for-the-badge&logoColor=black" /> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /> <br>

## Backend

<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/Amazon_RDS-527FFF?style=for-the-badge&logo=amazonaws&logoColor=white" /> <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />


## Deployment

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /> <br>

## Collaboration

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" /> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" /> <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" /> </div>
