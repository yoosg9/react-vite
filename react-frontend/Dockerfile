# Build 단계
FROM node:18 AS build
WORKDIR /app
COPY /react-frontend/package.json /react-frontend/package-lock.json ./
# RUN cd /react-frontend
RUN npm install
COPY . .
RUN npm run build

# Nginx를 사용하여 정적 파일 제공
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
