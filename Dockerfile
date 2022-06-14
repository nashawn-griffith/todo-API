FROM node:14-alpine AS base
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
EXPOSE 5000


FROM base AS dev
ENV NODE_ENV development
RUN npm install nodemon
CMD ["npm", "run", "dev"]