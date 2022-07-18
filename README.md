# Proyecto Prueba Isobar

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

### FrontEnd

Clone the project using the git commands in your terminal with `git clone ` or download the .zip file.

After that, execute the command `npm install` to install all the dependences and modules.

Finally, you should execute the command `npm start` that will open the following link [http://localhost:3000](http://localhost:3000) in your browser.

## BackEnd

To run this API you must have installed [PHP] [composer](https://getcomposer.org) and [Laravel](https://laravel.com)

For the backend you should clone or download the repository in the following link [ApiIsobar](https://github.com/Sagalo04/ApiIsobar) and run it on a local server such as [XAMPP](https://www.apachefriends.org)

After that you should run the command `composer install` in your project, which will import your packages and create the vendor folder, along with the autoload script.

Remember create a database called `heroesisobar`, a `.env` file, using the `.env.example` and updating your database username and password.

Finally run the migrations with `php artisan migrate` command, run the server with `php artisan serve` and enjoy your application.
