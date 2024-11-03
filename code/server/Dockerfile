FROM node:latest

WORKDIR /build_

RUN apt-get update && \
    apt-get install -y pandoc texlive texlive-latex-extra texlive-xetex


COPY package.json .

RUN npm install

COPY . .

CMD ["/bin/sh", "-c", "./scripts/start-server.sh"]
