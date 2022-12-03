# node-ts-studding

This is a simple project to study nodejs, mongodb, graphql and typescript

Im using `Apollo Server` to facilitate the Graphql implemmentation

To improve development expirience Im using `docker` to create a mongodb container and connect it with my application

The `mongo db` is be management using `mongoose` and `typeoose`


# Run it

Add `.env` file
## Start the container docker
- Install docker and docker-compose in your machine.
- Run `docker-compose up -d` to up the `mongo-express` and `mongo` images
- The `mongo-express` will be available in `localhost:8081`


## Install the node packages and run it
- Run `yarn` to add packages
- Run `yarn start:dev` and access `http://localhost:3000/graphql`