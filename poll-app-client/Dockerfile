# Stage 1: build the angular application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_URL=http://localhost:8080
RUN sed -i "s|http://localhost:8080|$API_URL|g" src/environments/environment.ts src/environments/environment.prod.ts
RUN npm run build -- --prod

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist/poll-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
