FROM node:10.16.3-alpine

ADD package.json /tmp/package.json

ADD package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm install

RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app

ADD . /app

RUN npm run serve:build

CMD ["npm", "run", "serve"]