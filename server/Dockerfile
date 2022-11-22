FROM node:16.13.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npx prisma generate
EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]