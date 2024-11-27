FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist/pdf_generator /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]