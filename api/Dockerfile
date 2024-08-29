FROM node:slim

# Create app directory
WORKDIR /app

COPY . .

RUN yarn && yarn build

EXPOSE 3000

CMD ["yarn", "start"]