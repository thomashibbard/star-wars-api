FROM node:18

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./
RUN npm install
RUN npm run build


ENV NODE_ENV=production
ENV PORT=8080

EXPOSE ${PORT}

CMD [ "node", "dist/main" ]