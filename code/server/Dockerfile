FROM node:latest

WORKDIR /build_

COPY package.json .

RUN npm install

COPY . .

CMD ["/bin/sh", "-c", "./scripts/start-server.sh"]
