FROM node:12

# Create app directory to hold the application code inside the image
WORKDIR /usr/src/app

# Copy code and install dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm install --only=production

# Compile code
RUN npm run build

# Expose port to outside world
EXPOSE 8989

# Run the app
CMD npm run start
