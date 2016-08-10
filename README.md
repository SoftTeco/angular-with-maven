# Angular with Maven

Boilerplate for Angular projects with Maven integration. Includes the next features:

1. Pug/Jade template engine
2. Stylus css processor
3. ES6 support with Babel
4. Dependencies management with Bower
5. Modernizr is already added in project
6. JS/CSS/HTML concatination with minification
7. Cache protection with MD5 for JS/CSS/images
8. Internationalization support for templates
9. Live reload development server for frontend part only
10. Jetty development server for frontend and backend
11. Unit testing on the fly with Karma

Some popular Angular dependencies already added in the project.

#Installation

Java, Maven, node.js and npm should be installed before these steps.

IMPORTANT! If you are Windows user run all commands in terminal as administrator

1. Run ```npm install```
2. Run ```bower install```
3. Run ```npm install -g grunt-cli``` (if it's not installed yet)

#Development

You can run development server with ```grunt dev``` command. It will starts light weight development server http://localhost:8080. It is very useful for frontend development only. ```sudo grunt dev:https``` will start dev server with SSL. The app will be available with this URL: https://localhost

You can also run backend development server with ```mvn jetty:run -P dev```.

# Building a distributive

1. ```npm install```
2. ```bower install```
3. ```mvn clean package```
