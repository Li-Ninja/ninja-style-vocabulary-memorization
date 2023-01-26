FROM node:14.17.2

WORKDIR /app
# also can use .dockerignore filter didn't use files
COPY dist/spa .
COPY package.json .
COPY env.js .
COPY .env .
RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server"]
