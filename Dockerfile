# Build stage
FROM mhart/alpine-node:15 as build

WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . /app
RUN npm run build

# Serve stage
FROM nginx:1.21-alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]