FROM node:14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . ./

EXPOSE 3002
CMD ["npm", "start"]