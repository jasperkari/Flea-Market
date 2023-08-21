# Flea-Market

This is a website for buying and selling second-hand goods. The front-end is built with React, while the back-end uses Moleculer microservices. Data is stored in IBM Cloudant and IBM Cloud Object Storage databases, and communication between servers is handled by a NATS server.

## Installation

To set up Flea-Market on your local machine, follow these steps:

1. Set up an IBM Cloudant and IBM Cloud Object Storage account.
2. Update the keys and addresses in the server code to match your account details.
3. Install a NATS server on your localhost.
4. Clone this repository and install dependencies using `npm install`.
5. Start the front-end using `npm start` and back-end servers using `nodemon broker.js` inside the folders of the specific component.

## Usage

Once Flea-Market is up and running, you can access the website at `http://localhost:3000`. From there, you can browse available items, create listings, and make purchases.
