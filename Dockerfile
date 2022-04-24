FROM node:16-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . ./
RUN npm run build

FROM nginx
COPY --from=0 /app/build /usr/share/nginx/html