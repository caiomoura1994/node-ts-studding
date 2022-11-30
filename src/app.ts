import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';

const { NODE_ENV, PORT, ORIGIN, CREDENTIALS } = process.env;

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(resolvers) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initApolloServer(resolvers);
  }

  public async listen() {
  }

  public getServer() {
    return this.app;
  }


  private initializeMiddlewares() {
    if (this.env === 'production') {
    }

    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private async initApolloServer(resolvers) {
    const schema = await buildSchema({
      resolvers,
    });

    const apolloServer = new ApolloServer({
      schema,
      introspection: true,


    });

    const { url } = await startStandaloneServer(apolloServer, {
      listen: { port: Number(this.port) },
    });

    console.log(`🚀  Server ready at: ${url}`);
  }

}

export default App;
