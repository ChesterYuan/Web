#!/bin/bash

# Create required directories
mkdir -p certbot/conf certbot/www

# Start nginx
docker-compose up --force-recreate -d nginx

# Get SSL certificate
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot \
    --email YOUR_EMAIL -d YOUR_DOMAIN --agree-tos --no-eff-email \
    --force-renewal

# Restart nginx to load the certificate
docker-compose restart nginx
