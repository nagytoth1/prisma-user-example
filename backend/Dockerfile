FROM node:20-alpine3.19

# change directory/starting point to /opt/app
WORKDIR /opt/app

# copy dependency files (idea: put COPY . . here to make it more simple?)
COPY ./package.json ./package-lock.json ./

# install dependencies (except for devDependencies, those are not needed for production)
RUN npm install --omit dev

# copy everything from host to container
COPY . .

# generate Prisma client
RUN npx prisma generate

# push database to defined mysql server
ENTRYPOINT [ "/bin/sh", "-c", "npx prisma db push && npm run start-prod" ]