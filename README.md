# ping-pong-server

## Description

Server part of multiplayer game 'ping-pong 2d'

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Node.js](https://nodejs.org) 

[npm](https://www.npmjs.com/)(which comes together with Node.js)

[MongoDB](https://www.mongodb.com/) or you can use cloud services like [mLab](https://mlab.com/)

[git](https://git-scm.com/downloads)

### Installation
Add your application configuration to your `.env` file in the root of project and initialize the variables that are shown in the `.env.example` file. After that open terminal at the project root directory and run command `npm install` which will install all dependencies.

### Development
This command below serve for run server in development mode. Default port is 3000 but you can change it by setting enviroment variable `PORT` in `.env` file.
```
npm run dev
```


## Running Tests
To run the tests open terminal and run this command below. It will run [Jest](https://facebook.github.io/jest/) tests. This command also download a mongodb memory server. So the first launch may take some time. Each test needs database connection. Therefore, if there are problems with the database connection, simply restart the tests.
```
npm run test
```
## Built With

- [Node.js](https://nodejs.org) - JavaScript runtime
- [Express](http://expressjs.com/) - The web framework
- [MongoDB](https://www.mongodb.com/) - NoSQL Database