import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __PROD__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import redis from "redis";
import session from "express-session";
import connectReddis from "connect-redis";
import cors from "cors";
// import { User } from "./entities/User";

const main = async () => {
  // sendEmail("bob@bob.com", "Hey buddy 💋"); // when server starts up send email to whoever we want to
  // create database
  const orm = await MikroORM.init(microConfig); // connect to database
  // await orm.em.nativeDelete(User, {});
  // await orm.getMigrator().up(); // automatically run migrations

  // create server
  const app = express(); // create an express app

  // CONNECT TO REDDIS
  const RedisStore = connectReddis(session);
  const redisClient = redis.createClient();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  ); // add CORS origin using CORS middleware else it defaults to *

  app.use(
    session({
      name: COOKIE_NAME, // coming from constants file
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }), // must run before Apollo middleware
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // makes it so that the cookie is not accessible in the browser
        sameSite: "lax",
        secure: __PROD__, // cookie only works in https
      },
      saveUninitialized: false, // don't create session by default even if we don't save any data
      secret: "keyboard cat", // best practice is to make this an environment variable
      resave: false,
    })
  );
  // CONNECT TO REDDIS END

  // graphql endpoint
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }), // special object that is accesible by all resolvers
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4444, () => {
    console.log(`server started ib localhost: 4444 🌎`);
  });

  // RUN SQL
  // const post = orm.em.create(Post, {title: 'my first post'})
  // // insert post into database
  // await orm.em.persistAndFlush(post)
  // const posts = await orm.em.find(Post, {});
};

main().catch((err) => {
  console.log(`index.ts - 23 - 😳`, err);
});
