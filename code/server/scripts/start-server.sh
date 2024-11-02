#!/bin/sh

if [ "$LOCAL" = "false" ]; then
    export DATABASE_HOSTNAME="$PROD_HOSTNAME"
fi

if [ "$MIGRATE" = "true" ]; then
    npx prisma migrate dev --schema=./prisma/schema.prisma
fi

npm start
