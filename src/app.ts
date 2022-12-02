import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import express from 'express';
// import helmet from 'helmet';
// import hpp from 'hpp';
import { buildSchema } from 'type-graphql';
import http from 'http';
import { json } from 'body-parser';

// import { createConnection } from 'typeorm';
const { NODE_ENV, PORT, ORIGIN, CREDENTIALS } = process.env;
// import { dbConnection } from '@databases';
// import { authMiddleware, authChecker } from '@middlewares/auth.middleware';
import errorMiddleware from '@middlewares/error.middleware';
// import { logger, responseLogger, errorLogger } from '@utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(resolvers) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    // this.connectToDatabase();
    this.initializeMiddlewares();
    this.initApolloServer(resolvers);
    this.initializeErrorHandling();
  }

  public async listen() {
    // this.app.listen(this.port, () => {
    //   console.log(`=================================`);
    //   console.log(`======= ENV: ${this.env} =======`);
    //   console.log(`🚀 App listening on the port ${this.port}`);
    //   console.log(`🎮 http://localhost:${this.port}/graphql`);
    //   console.log(`=================================`);
    // });
  }

  public getServer() {
    return this.app;
  }

  // private connectToDatabase() {
  //   createConnection(dbConnection);
  // }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      // this.app.use(hpp());
      // this.app.use(helmet());
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
      // authChecker,
    });
    const httpServer = http.createServer(this.app);

    const apolloServer = new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
      ],
      // context: async ({ req }) => {
      //   try {
      //     const user = await authMiddleware(req);
      //     return { user };
      //   } catch (error) {
      //     throw new Error(error);
      //   }
      // },
      // formatResponse: (response, request) => {
      //   responseLogger(request);

      //   return response;
      // },
      // formatError: error => {
      //   errorLogger(error);

      //   return error;
      // },
    });

    await apolloServer.start();
    this.app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({ token: req.headers.token }),
      }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: this.port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${this.port}/graphql`);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
