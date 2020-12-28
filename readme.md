1. npm init -y
2. yarn add -D @types/node typescript
3. "scripts": {
   "watch": "tsc -w",
   "dev": "nodemon dist/index.js",
   "serve": "node dist/index.js",
   "start": "ts-node src/index.ts"
   }
4. Setup mikroORM: How we're going to interact with our database, create tables, add data, set data, select data. All our database needs
5.
