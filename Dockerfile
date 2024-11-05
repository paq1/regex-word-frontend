FROM node:22 as builder
ARG BUILD_PROG=build
WORKDIR app
COPY . ./
RUN npm install
RUN npm run $BUILD_PROG

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/regex-word-frontend/browser /usr/share/nginx/html
