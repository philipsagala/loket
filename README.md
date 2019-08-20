# Loket

  The test is written in Nodejs with Expressjs as the framework.

## Requirement  
It would be better to followup this setup to avoid error when installing the application

 - NodeJs (v8.11.3)
 - NPM (6.10.3)
 - PostgreSQL (10.x)
 - GIT

### setup application
Download url for NodeJs [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
Download url for PostgreSQL [enter link description here](https://www.postgresql.org/download/)

#### Setup Command

    git clone https://github.com/philipsagala/loket.git
    npm install
    npm run build
    npm start
 
 Locate config/config.json to Update database configuration, change the config on development 
 
**npm run build** This application came with ready set of dummy data. This is custom command for database migration and also data seeder. After executing this command you can start to create new transaction.

Database schema is stored in root directory with name database.sql

## Unit testing

#### Run Command
    npm install
    npm run build
    npm test
    
#### Coverage Test result
![Coverage Result](./coverage-result.JPG?raw=true 'Coverage Result')


 
