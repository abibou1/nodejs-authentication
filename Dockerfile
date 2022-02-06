ARG VERSION
ARG VERSION_ALPINE=14.18.3

FROM node:${VERSION} as builder

ENV PORT=4001

RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY . .

RUN npm install

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "start"]