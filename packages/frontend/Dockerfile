FROM node:12

RUN mkdir /code && chown -R node:node /code && npm i -g serverless --registry https://registry.npm.taobao.org

USER node

WORKDIR /code

RUN npm config set registry https://registry.npm.taobao.org

COPY --chown=node:node ./package.json ./package-lock.json /code/

RUN npm ci

ADD --chown=node:node . /code

CMD [ "npm start" ]
