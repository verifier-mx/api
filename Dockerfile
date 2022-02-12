FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY id_github /root/.ssh/id_rsa
RUN mkdir -p /root/.ssh
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

RUN yarn install --production --frozen-lockfile

COPY . ./

ENV NODE_ENV=production
CMD [ "yarn", "start" ]
