# VueSurvey
📜 Simple form and survey app using surveyjs. Using Vue.js for client side rendering and authentication via jwt

This project can be viewed at https://survey.lukeaz.ml

![logo](https://github.com/LukeAz/VueSurvey/blob/main/docs/preview.png)

## Technologies
Project includes:
* Nodejs programming language
* Express framework for the web server
* JWT token for the authentication system
* Client side rendering using Vue.js
* Sqlite3 for database
* SurveyJS (JavaScript Survey and Form Library)
* Using DOMPurify to avoid xss
* Using fontawesome for some icons

# - CONFIGURE THE APPLICATION

### Generate certificates for JWT authentication
1. enter with the terminal in the /cacert folder
2. have openssl installed and configured in the path
3. generate certificates with `./jwt.sh` by bash

### Generate certificates for HTTPS
1. enter with the terminal in the /cacert folder
2. have openssl installed and configured in the path
3. generate certificates with `./ca.sh` by bash

### Port used by express
1. open the .env file.
2. change the PORT field to the desired port.
3. if you use the docker the command to build the container must contain the correct port forwadding.

# - START THE APPLICATION

### Standard method:
1. have nodejs installed
2. open the terminal and move to the project folder.
3. install dependencies with `npm install --include=dev`.
4. build project with `npm run build`.
5. start the application with `npm start`.

### Using the docker from cli:
1. have docker installed.
2. open terminal and move to the project folder.
3. build the container image: `sudo docker build . -t luca/vuesurvey`.
4. build the container (it will be started automatically): `sudo docker run -p 443:443 --name VueSurvey -d luca/vuesurvey`.
5. see running containers: `sudo docker ps`.
6. start container: `docker start [container id]`.
7. shut down container: `docker stop [container id]`.
8. remove container: `docker rm [container id]`.
9. see the built images: `docker images -a`.
10. delete image: `docker rmi luca/vuesurvey`.
