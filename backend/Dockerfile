FROM node:20-alpine3.19

# change directory/starting point to /opt/app
WORKDIR /opt/app

# copy dependency list only (this is rarely to change, so it can be cached)
COPY ./package.json ./package-lock.json ./

# install dependencies (except for devDependencies, those are not needed for production) (can be cached)
RUN npm install --omit dev

# copy everything from this host folder to container workdir (/opt/app)
# when something changes in the other files, it takes less build time to run again
COPY . .

# generate Prisma client
RUN npx prisma generate

# push database to defined mysql server
ENTRYPOINT [ "/bin/sh", "-c", "npx prisma db push && npm run start-prod" ]