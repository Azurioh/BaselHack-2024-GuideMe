#!/bin/sh

if [ "$PROD" = "true" ]; then
    export DATABASE_HOSTNAME="baselhack.azu-dev.fr"
fi

export DATABASE_URL=postgresql://postgres:root@$DATABASE_HOSTNAME:5432/baselhack?schema=public

if [ "$MIGRATE" = "true" ]; then
    npx prisma migrate dev --name "initial_migration" --schema=./prisma/schema.prisma
fi

npm start
