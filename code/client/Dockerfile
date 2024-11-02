FROM node:latest

WORKDIR /build_

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
