FROM node:14
WORKDIR /webappclient
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 5173
CMD ["npm", "start"]