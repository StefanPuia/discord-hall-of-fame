FROM node:alpine

WORKDIR /app

COPY build .
COPY package.json .
COPY yarn.lock .

RUN corepack enable
RUN yarn install --frozen-lockfile --prod

CMD ["node", "index.js"]
