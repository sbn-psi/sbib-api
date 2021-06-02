FROM node:12

# COPY frontend to apache directory
COPY ./app /var/www/html
COPY .htaccess ./

# Create app directory to serve backend/API
WORKDIR /usr/local/sbib

# Copy code and install dependencies
COPY package*.json ./
COPY tsconfig.json ./

# Install apache service
RUN apt-get update && \
    apt-get install -y apache2;

# Apache configs
COPY apache2.conf /etc/apache2/

# Enable rewrite_mod and restart apache to apply custom settings
RUN a2enmod rewrite;

COPY ./src ./src
COPY ./db ./db

RUN npm install --only=production

# Compile code
RUN npm run build

# Expose port to outside world
EXPOSE 9495

# Run the app
CMD npm run start
