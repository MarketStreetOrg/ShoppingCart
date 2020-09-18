FROM node:12

WORKDIR /usr/src/katale/app

ARG PORT
ARG HOST
ARG MONGOURL
ARG CONTAINER_NAME
ARG IMAGE_REPO_NAME

ENV port=${PORT}
ENV host=${HOST}
ENV mongoURL=${MONGOURL}

COPY package*.json ./

RUN npm install

RUN printf '[{"name":"%s","imageUri":"%s"}]' $CONTAINER_NAME $IMAGE_REPO_NAME > imagedefinitions.json

RUN ls -lrt

COPY . .

EXPOSE 8080

CMD ["node","server.js"]

