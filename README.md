# sggs-app-server
sggs application server

## Installation
    1. clone the git repo https://github.com/sarabsandhu/sggs-app-server.git using command
        git clone https://github.com/sarabsandhu/sggs-app-server.git
    2. change into directory sggs-app-server using command
        cd sggs-app-server
    3. run the below command to install all required dependencies
        npm install
    4. Start the application
        1. run below command to start the app for development mode (port = 8000)
            NODE_ENV=development npm start 
        2. run below command to start the app for production mode (port = 8080)
            NODE_ENV=production npm start 
    5. app will start running on port 8000 for development and 8080 for production.
    
npm install

## Run sggs app server

npm start

## Run sggs app server in development mode

npm run dev

## test sggs app server

after running the app, use below urls to test app

http://localhost:8000/api/sggs/search?language=english&type=firstInitialLetter&keyword=gmk&skip=0&rowCount=50

http://localhost:8000/api/sggs/search?language=gurmukhi&type=firstInitialLetter&keyword=gmk&skip=0&rowCount=50

git clone https://github.com/sarabsandhu/sggs-app-server.git