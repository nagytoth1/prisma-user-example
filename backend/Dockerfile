FROM node:20-alpine3.19

# change directory/starting point to /opt/app
WORKDIR /opt/app

# 
COPY ./package.json ./package-lock.json ./

# install dependencies (except for devDependencies, those are not needed for production)
RUN npm install --omit dev
COPY . .

# COPY hoston: ./* remoteon: /opt/app
RUN npx prisma generate

ENTRYPOINT [ "/bin/sh", "-c", "npx prisma db push && npm run start-prod" ]