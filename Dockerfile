FROM node

RUN mkdir /app
COPY src /app/src
COPY assets /app/assets
COPY package.json /app/package.json

WORKDIR /app/

RUN npm install && npm run build

ENTRYPOINT ['node dist/server/App.js']
