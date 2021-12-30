FROM node:11-alpine

RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY . .

RUN npm install

EXPOSE 4001

CMD ["npm", "run", "start"]