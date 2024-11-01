#!/bin/sh

cd ..

export $(cat .env | xargs)

export DATABASE_HOSTNAME="localhost"

npx prisma migrate dev --schema=./prisma/schema.prisma
