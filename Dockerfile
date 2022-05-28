FROM node:15.13-alpine

RUN mkdir -p /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn install --silent --ignore-engines

RUN yarn global add serve

RUN yarn build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]