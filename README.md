## Balance Finance Platform

Welcome to the Balance Finance Platform! This platform consists of two main components, the client application (client-app) and the server application (server-graphql-app). The client application is implemented using **React, Typescript, Vite, MUI**, and it runs on port 3000. The server application is implemented using **GraphQL-Yoga, Typescript** and runs on port 4000. This README will guide you through the installation process and provide an overview of the platform.

#### Installation

To get started with the Balance Finance Platform, follow the steps below:

Clone the repository to your local machine
`git clone git@github.com:akeco/balance-finance.git`
Open a terminal and navigate to the root folder of the repository
Navigate to the `client-app` folder and run `yarn` to install dependencies
Navigate to the `server-graphql-app` folder and run `yarn` install to install dependencies
Running the Platform
To run the platform, follow the steps below:

Navigate to the `client-app` folder and run `yarn dev` to start the client application. This will start the client application on port **3000**.
Client app contains `.env` file with `VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql` env variable for server GraphQL API connection.

Navigate to the `server-graphql-app` folder and run `yarn dev` to start the server application. This will start the server application on port **4000** and `http://localhost:4000/graphql` endpoint.
Besides http protocol, server app is using web sockets to provide GraphQL Subscriptions feature, and it can be accessed through `ws://localhost:4000/graphql` endpoint.

You can now access the Balance Finance Platform by navigating to `http://localhost:3000` in your browser.

#### Testing

Application is partially covered with unit tests using Vitest for client app, and Jest for server app.
Run the tests with command `yarn test`

#### Folder Structure

The Balance Finance Platform consists of two main folders:

client-app - This folder contains the client application implementation using React, Typescript, and Vite.
server-graphql-app - This folder contains the server application implementation using GraphQL-Yoga.
Dependencies
The Balance Finance Platform uses yarn for managing dependencies. All the dependencies are listed in the package.json file for each of the two folders, client-app and server-graphql-app.

#### License

The Balance Finance Platform is licensed under the MIT license. See the LICENSE file for more details.
