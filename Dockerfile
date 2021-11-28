FROM alpine:latest
RUN apk update && apk upgrade && apk add --update nodejs npm build-base make python3

WORKDIR /usr/src/vuesurvey
COPY package.json package.json

RUN npm install --include=dev
COPY . .

RUN npm run build

CMD [ "npm", "start" ]