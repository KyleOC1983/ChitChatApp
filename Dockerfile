FROM node:current-slim

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .
RUN npm install -g @angular/cli
RUN ng build --prod

EXPOSE 8080


CMD [ "npm", "start" ]