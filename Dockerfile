FROM node:17

WORKDIR /myapp

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]