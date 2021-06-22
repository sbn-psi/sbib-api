FROM node:12

# Create app directory to serve backend/API
WORKDIR /usr/local/sbib

# Copy code and install dependencies
COPY package*.json ./
COPY tsconfig.json ./

COPY ./src ./src
COPY ./db ./db

RUN npm install --only=production

# Build
RUN npm run build
COPY ./client ./dist/client

# Run the app
CMD npm run start