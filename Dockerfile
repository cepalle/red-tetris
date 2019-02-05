FROM node

RUN mkdir /app
COPY src /app/src
COPY assets /app/assets
COPY package.json /app/package.json
COPY .babelrc /app/.babelrc
COPY webpack.config.js /app/webpack.config.js

WORKDIR /app/

RUN npm install && npm run build

ENTRYPOINT ["npm", "run", "serve"]

