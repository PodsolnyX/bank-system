FROM node:18
WORKDIR /bffclient
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]