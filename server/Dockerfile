FROM node:16.13.1
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx prisma generate
COPY . ./
EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]