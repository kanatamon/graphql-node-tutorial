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
