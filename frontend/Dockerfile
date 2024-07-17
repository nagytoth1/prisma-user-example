FROM ntas-sandbox-docker-virtual.artifactory-espoo1.int.net.nokia.com/node:18-alpine

WORKDIR /opt/app

COPY package.json .

RUN npm config set proxy http://87.254.212.120:8080 && npm i && npm i -g serve

COPY . .

RUN npm run build

ENTRYPOINT [ "serve -s dist -l 0.0.0.0:${FRONTEND_PORT}" ]