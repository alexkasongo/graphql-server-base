1. npm init -y
2. yarn add -D @types/node typescript
3. "scripts": {
   "watch": "tsc -w",
   "dev": "nodemon dist/index.js",
   "serve": "node dist/index.js",
   "start": "ts-node src/index.ts"
   }
4. Setup mikroORM: How we're going to interact with our database, create tables, add data, set data, select data. All our database needs
5. yarn add @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql pg
6. Add mikro-orm config
7. Setup migrations
8. yarn add express apollo-server-express graphql type-graphql
9. yarn add -D @types/express
10. yarn add argon2
11. yarn add redis connect-redis express-session @types/redis @types/express-session @types/connect-redis
    Store session in redis because it is fast. Reddis is an in memory database but we could also use postgresql, mongodb etc
    On every request we're going to check if the user is logged in
12. yarn add nodemailer @types/nodemailer
    we'll be using this to setup forgot password and it allows us to send out test emails in development
13. yarn add uuid ioredis
