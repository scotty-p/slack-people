# slack-people
[![Build Status](https://secure.travis-ci.org/Kauabunga/slack-people.png?branch=master)](https://travis-ci.org/Kauabunga/slack-people)

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`


### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Copy the file `./server/constants/app.example.json` to `./server/constants/app.json` and populate the Slack app Client Id and Client secret

4. Run `npm run dev` to start the development server. It should automatically open the client in your browser when ready.


## Heroku build and deployment

Heroku builds are automatically built and deployed from the master branch to `http://solnet-people-dev.herokuapp.com/`. 
These can then be promoted to the Heroku production environment `http://solnet-people.herokuapp.com/`

Check the `.travis.yml` for deployment config

## AWS Elastic Beanstalk build and deployment

1. Build a zip version for AWS Elastic Beanstalk run `npm run build-elastic` and see the file `./latest.zip`
2. Create a new Elastic Beanstalk application
3. Create a new Elastic Beanstalk environment selecting the platform as `Node.js` and the app code as upload your own code and select the `latest.zip` you built earlier
4. Configure the Elastic Beanstalk environment Software Configuration with the following environment properties:
    - NODE_ENV = production 
    - MONGODB_URI = <An accessable MongoDB URI>
    - SLACK_CLIENT_ID = <The client id for your slack app>
    - SLACK_CLIENT_SECRET = <The client secret for your slack app>
 
