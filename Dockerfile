# Multi-stage building - Stage 1: building the FRONTEND side
FROM node:22-alpine3.20 AS builder

# change directory/starting point to /app
WORKDIR /app

# copy dependency list only (this is rarely to change, so it can be cached)
COPY ["frontend/package.json", "frontend/package-lock.json","./"]

# build the FRONTEND
RUN npm ci
COPY frontend/ .
RUN npm run build

# Multi-stage building - Stage 2: running the application, BACKEND side
FROM node:22-alpine3.20

WORKDIR /app
# when something changes in the other files, it takes less build time to run again
# copy BACKEND dependencies so they could be installed
COPY ["backend/package.json", "backend/package-lock.json*", "./"]

# install product dependencies only
RUN npm ci --omit=dev

# copy built frontend from 1st stage "builder"
COPY --from=builder /app/dist ./dist/

# copy everything else that changes more frequently
COPY backend/ .

# push database to defined mysql server and start the backend
ENTRYPOINT [ "./entrypoint.sh" ]