FROM node:20-alpine3.19

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install

RUN npm i -g serve

# copy the rest of the application
COPY . .

# build and start the frontend
ENTRYPOINT [ "/bin/sh", "-c", "npm run build && serve -s dist" ]