FROM node:10

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install Node Packages
RUN npm install

# Copying app source
COPY src/ src/

# Copying public folder
COPY public/ public/

CMD ["npm", "start"]