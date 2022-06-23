FROM node:18-alpine3.15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install -g npm && npm install

# Bundle app source
COPY . .
CMD ["npm", "start"]
