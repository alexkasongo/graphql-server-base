import 'reflect-metadata'
import { MikroORM } from "@mikro-orm/core";
import { __PROD__ } from "./constants";
// import { Post } from "./entities/Posts";
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
    // create database
    const orm = await MikroORM.init(microConfig) // connect to database
    await orm.getMigrator().up() // automatically run migrations

    // create server
    const app = express() // create an express app 

    // graphql endpoint
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em }) // special object that is accesible by all resolvers
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4444, () => {
        console.log(`server started ib localhost: 4444 🌎`);
    })




    // RUN SQL 
    // const post = orm.em.create(Post, {title: 'my first post'})
    // // insert post into database
    // await orm.em.persistAndFlush(post)
    // const posts = await orm.em.find(Post, {});
}

main().catch((err) => {
    console.log(`index.ts - 23 - 😳`, err);
})
