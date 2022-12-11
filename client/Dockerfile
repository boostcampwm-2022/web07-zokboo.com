FROM node:16.13.1
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm i --save serve
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "run", "serve"]