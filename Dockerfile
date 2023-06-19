FROM node:16.10.0-slim as builder
WORKDIR /app
# also can use .dockerignore filter didn't use files
COPY dist/spa .

FROM nginx
COPY --from=builder /app /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
