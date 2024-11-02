#!/bin/sh

if [ -z "$LOCAL" ]; then
    export DATABASE_HOSTNAME="$PROD_HOSTNAME"
fi

if [ -n "$MIGRATE" ]; then
    npx prisma migrate dev --schema=./prisma/schema.prisma
fi

npm start