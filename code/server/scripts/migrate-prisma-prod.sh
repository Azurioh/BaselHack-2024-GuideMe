#!/bin/sh

cd ..

export $(cat .env | xargs)

export DATABASE_HOSTNAME="$PROD_HOSTNAME"

npx prisma migrate dev --schema=./prisma/schema.prisma
