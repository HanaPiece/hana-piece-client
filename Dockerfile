# 1단계: 빌드 단계
FROM node:18 AS build

WORKDIR /app

# package.json과 yarn.lock을 복사
COPY package.json yarn.lock ./

# 종속성 설치
RUN yarn install

# 소스 코드를 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

# 2단계: 런타임 단계
FROM nginx:alpine

# Nginx 설정 파일을 복사 (선택 사항)
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드 결과물을 Nginx의 기본 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 포트 80 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
