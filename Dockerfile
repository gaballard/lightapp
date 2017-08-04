FROM node:8-wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install

# Bundle app source
COPY . /usr/src/app

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "run", "dev"]