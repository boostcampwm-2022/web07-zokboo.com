FROM node:16.13.1
WORKDIR /app
COPY package*.json ./
RUN npm i
ARG SERVER_URL
ENV REACT_APP_BASE_URL=${SERVER_URL} \
	DISABLE_ESLINT_PLUGIN=true
COPY ./ ./
RUN npm i --save serve
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "run", "serve"]