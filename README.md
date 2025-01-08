# Hello, This is the guide to start my project

This is the updated Version of my project

1. Open the terminal, navigate to the backend directory, and run the following command:
"docker compose up -d" 
Make sure that you have a docker installed on your computer. If you don’t have it yet, you can download it through this link : 
https://www.docker.com/

Before proceeding to the next step, make sure to run the migration to set up the customer table then proceed to run the following command: 
"docker compose exec app php artisan migrate"

2. To run the react frontend, go to client-side folder install the necessary npm packages by running the following command: 
"npm install"
    Launch the React application using the command: "npm start"
    Once the application is running, you can access it in your web browser at: "http://localhost:3000/"


    To test it in a local environment, follow these steps to configure your database settings: 
    -Open the .env File
    -Navigate to the backend directory.
    -Open the .env file in a text editor of your choice.
    
    Make sure the database settings match your local database configuration. For example:
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    