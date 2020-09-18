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

RUN printf '[{"name":"$CONTAINER_NAME","imageUri":"$IMAGE_REPO_NAME"}]' > imagedefinitions.json

COPY . .

EXPOSE 8080

CMD ["node","server.js"]

