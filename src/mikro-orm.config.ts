import { Post } from "./entities/Posts";
import { __PROD__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path"; // function built into node
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: "feddit", // database, we can change the database here
  type: "postgresql",
  // log what sql is being executed under the hood, should only be true in dev
  debug: !__PROD__,
} as Parameters<typeof MikroORM.init>[0];
