# Use the official PHP image with Apache
FROM php:8.1-apache

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable the Apache mod_rewrite
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html

# Copy the existing application directory
COPY . .

# Copy Apache configuration file
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Install Composer directly
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install application dependencies
RUN composer install

# Expose port 80
EXPOSE 80

# Set ownership and permissions



# Start Apache
CMD ["apache2-foreground"]
