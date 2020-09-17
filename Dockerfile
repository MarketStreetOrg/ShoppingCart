FROM node:12
WORKDIR /usr/src/katale/app

ARG PORT=8080
ARG HOST="localhost"
ARG MONGOURL="mongodb+srv://StevenKatabalwa:root@shoppingcartcluster.qgkbf.mongodb.net/katale?retryWrites=true&w=majority"

ENV port=${PORT}
ENV host=${HOST}
ENV mongoURL=${MONGOURL}

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node","server.js"]

