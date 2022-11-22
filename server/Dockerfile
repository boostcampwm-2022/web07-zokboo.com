FROM node:16.13.1
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]