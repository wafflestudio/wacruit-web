# Wacruit-Web

## 와플스튜디오 리크루팅 페이지 리뉴얼

# Table of Contents

- [Usage](#Usage)

# Usage

## 개발 환경 세팅

```shell
yarn
husky install # 허스키(pre-commit library) 설치
husky add .husky/pre-commit "lint-staged --no-stash --verbose" # 허스키 명령어 세팅
husky add .husky/pre-push "typecheck"

```

- 윈도우의 경우

```shell
yarn
yarn husky install # 허스키(pre-commit library) 설치
yarn husky add .husky/pre-commit "yarn lint-staged --no-stash --verbose" # 허스키 명령어 세팅
yarn husky add .husky/pre-push "yarn typecheck"

```

## 테스트 서버 실행

```shell
yarn dev
```

## 빌드

```shell
yarn build
```
