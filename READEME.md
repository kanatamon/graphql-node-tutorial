# GraphQL-Node Tutorial

## Lessons

- [x] [Introduction](https://www.howtographql.com/graphql-js/0-introduction/)
- [x] [Getting Started](https://www.howtographql.com/graphql-js/1-getting-started/)
- [x] [A Simple Query](https://www.howtographql.com/graphql-js/2-a-simple-query/)
- [x] [A Simple Mutation](https://www.howtographql.com/graphql-js/3-a-simple-mutation/)
- [x] [Connecting The Server and Database with Prisma Client](https://www.howtographql.com/graphql-js/5-connecting-server-and-database/)
- [x] [Authentication](https://www.howtographql.com/graphql-js/6-authentication/)
- [ ] [Realtime graphql subscriptions](https://www.howtographql.com/graphql-js/7-subscriptions/)
- [ ] [Filtering, pagination & sorting](https://www.howtographql.com/graphql-js/8-filtering-pagination-and-sorting/)
- [ ] [Summary](https://www.howtographql.com/graphql-js/9-summary/)

## Install

```cmd
# 1. Install dependencies
npm install

# 2. Apply that migration to your database
npx prisma migrate up --experimental

# 3. Re-generate Prisma Client
npx prisma generate

# 4. Running application
node ./src/index.js
```

## Managing Database via Prisma Studio

```
npx prisma studio --experimental
```

## Updating Prisma Client

After every change you make to the data model, the file `./prisma/schema.prisma` , you need to migrate your database and then re-generate Prisma Client.

```cmd
# 1. Create new migration
npx prisma migrate save --experimental

# 2. Apply that migration to your database
npx prisma migrate up --experimental

# 3. Re-generate Prisma Client
npx prisma generate
```
