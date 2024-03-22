FROM node:21-alpine3.17 AS BASE
WORKDIR /app

FROM BASE AS BUILDER

RUN apk add --update xdg-utils

ENV PATH /app/node_modules/.bin:$PATH

COPY frontend/package.json /app/
COPY frontend/package-lock.json /app/
RUN npm install --silent
COPY /frontend/ /app/
RUN npm run build

FROM BUILDER AS final

EXPOSE 81
CMD ["npm", "run", "dev"]