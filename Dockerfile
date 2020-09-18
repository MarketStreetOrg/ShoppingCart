FROM node:12
WORKDIR /usr/src/katale/app

ARG PORT
ARG HOST
ARG MONGOURL

ENV port=${PORT}
ENV host=${HOST}
ENV mongoURL=${MONGOURL}

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node","server.js"]

