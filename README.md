# Hello, This is the guide to start my project

This is the updated Version of my project

1. Open the terminal, navigate to the backend directory, and run the following command:
"docker compose up -d" 
to run it on container Make sure you have docker already installed on your computer if not you can download it here https://www.docker.com/

Make sure to migrate before proceeding to step number 2 "docker compose exec app php artisan migrate"

2. to run the react client side go to client-side folder then install npm packages by using "npm install"
    to start it just "npm start"
    you can access it on "http://localhost:3000/"


    if you wanna test it on local environment In the backend/.env file, make sure the database settings match your local database configuration. For example:
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    