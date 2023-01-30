# assignment-frontend

## KONKRIT Frontend 코딩 과제

이 저장소를 fork하여 아래 시나리오대로 최대한 구현한 후, 과제를 안내받은 메일로 fork한 저장소 주소를 전달해주세요. 그리고 과제 구현 중 문의사항이 있으시다면 동일하게 메일로 보내주세요.

## 주의사항

- 꼭 mainnet이 아닌 goerli 테스트넷을 사용하여 구현해주세요.
- goerli 테스트넷 account에 소유한 NFT가 없어서 어려움이 있으시다면, 메일로 계정의 publicAddress(비밀키는 절대 공유되어서는 안됩니다)를 보내주세요. 테스트에 사용할 수 있는 NFT를 airdrop 해드립니다.

## 과제 시나리오

1. SIWE(Sign In With Ethereum) 구현

- 메타마스크로 account 연결하기
- 연결된 account의 publicAddress에 맞는 nonce 값을 서버에서 가져옴
- 서버에서 받은 nonce 값에 지갑 서명(sign message)을 하여 signature 생성
- nonce, signature으로 서버에서 accessToken, refreshToken 가져와서 header에 `Authorization: Bearer <accessToken>` 세팅
- 로그인 유지되도록 세팅

2. 내 NFT 확인하기 구현

- 서버에서 현재 로그인한 account의 NFT 가져오는 API 호출하여 화면에 보여주기
- 디자인은 tailwindcss를 사용하여 임의로 구성

3. 내 NFT 전송하기

- `react-hook-form` 라이브러리를 활용하여 전송받을 주소 입력 폼 생성
- validate 추가 (required, 전송받은 account의 정확한 publicAddress를 입력했는지 여부, 현재 로그인한 account의 publicAddress와 같지 않은지 여부)
- ERC721 `transferFrom` method를 호출하여 폼으로 입력받은 주소로 전송

### API

- base url: `https://lrvalrdo8k.execute-api.us-east-1.amazonaws.com/Prod`
- getNonce API: `GET /users/nonce`
  - query parameter: `publicAddress`
- getToken API: `POST /auth/token`
  - data: `nonce`, `signature`
- getOwnedNFT API: `GET /users/nfts`

### 🧱 Directory

- `@/components/design`: props를 받아서 rendering만 하는 디자인 컴포넌트들
- `@/components/* (not design)`: 비지니스 로직을 가지고 있는 컴포넌트들
- `@/pages/`: 페이지 컴포넌트들
- `@/shared/*`: constants, utils, store, services, hooks, config 등
- `@/shared/ethers/abi`: ERC721 abi 파일

## 🖋 Stack

- React 18
- Typescript
- Tailwind CSS
- React-Router v6
- React-Query v4
