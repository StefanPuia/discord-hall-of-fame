FROM node:22-alpine

WORKDIR /app

COPY build .
COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --prod

CMD ["node", "index.js"]
