FROM node:21-bullseye-slim AS base
WORKDIR /app

FROM base AS builder

#RUN apk add --update xdg-utils

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install --silent
COPY . /app/
RUN npm run build

FROM builder AS final

EXPOSE 10000
CMD ["next", "dev", "-p", "10000"]