FROM node:26-alpine

WORKDIR /app

COPY build .
COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --prod

CMD ["node", "index.js"]
