FROM node:21 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build


FROM node:21-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN yarn --production
EXPOSE 6543
CMD ["node", "dist/index.js"]