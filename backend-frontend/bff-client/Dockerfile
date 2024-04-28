FROM node:18
WORKDIR /bffclient
COPY . .
RUN yarn install
EXPOSE 3000
CMD [ "npm", "start" ]