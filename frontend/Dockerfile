FROM node:21-bullseye-slim AS base
WORKDIR /app

FROM base AS builder

#RUN apk add --update xdg-utils

ENV PATH /app/node_modules/.bin:$PATH

COPY frontend/package.json /app/
COPY frontend/package-lock.json /app/

RUN npm install --silent
COPY frontend/ /app/
RUN npm run build

FROM builder AS final

EXPOSE 81
CMD ["next", "dev", "-p", "81"]