## Installation
    1. clone the git repo https://github.com/sarabsandhu/sggs-app-server.git using command
        git clone https://github.com/sarabsandhu/sggs-app-server.git
    2. change into directory sggs-app-server using command
        cd sggs-app-server
    3. run the below command to install all required dependencies
        npm install

## Setup in Visual Studio Code
    1. Import the cloned directory into your Visual Studio Workspace along side React client app
    2. Open a terminal window in Visual Studio Code
    3. Navigate to cloned directory in Installation step 2.
    4. Run the App using below Steps mentioned in Run Sggs app server

## Run sggs app server

    1. run below command to start the app for development mode (port = 8000)
        NODE_ENV=development npm start 
    2. run below command to start the app for production mode (port = 8080)
        NODE_ENV=production npm start 

    App will start running on port 8000 for development and 8080 for production.

## test sggs app server

    after running the app, use below urls to test app

    http://localhost:8000/api/sggs/search?language=english&type=firstInitialLetter&keyword=gmk&skip=0&rowCount=50

    http://localhost:8000/api/sggs/search?language=gurmukhi&type=firstInitialLetter&keyword=gmk&skip=0&rowCount=50
